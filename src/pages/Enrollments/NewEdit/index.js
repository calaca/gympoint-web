import React, { useEffect, useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Form } from '@rocketseat/unform';
import SelectAsync from 'react-select/async';
import Select from 'react-select';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import CurrencyFormat from 'react-currency-format';
import {
  addMonths,
  differenceInMinutes,
  differenceInSeconds,
  addSeconds,
  addMinutes,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { Label, Grid } from './styles';

export default function NewEdit() {
  const history = useHistory();
  const enrollment =
    history.location.state && history.location.state.enrollment
      ? history.location.state.enrollment
      : null;

  registerLocale('pt', pt);

  const [student, setStudent] = useState(
    enrollment
      ? { value: enrollment.student.id, label: enrollment.student.name }
      : ''
  );
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState(enrollment ? enrollment.plan : '');
  const [startDate, setStartDate] = useState(
    enrollment ? parseISO(enrollment.start_date) : new Date()
  );

  async function loadStudents(query) {
    const response = await api.get(`students?q=${query}`);
    const formattedStudents = response.data.map(s => {
      return {
        ...s,
        value: s.id,
        label: s.name,
      };
    });

    return new Promise(resolve => {
      resolve(formattedStudents);
    });
  }

  async function loadPlans() {
    try {
      const response = await api.get('plans');

      setPlans(response.data);
    } catch (err) {
      err.response.data.errors.map(error => toast.error(error.msg));
    }
  }

  useEffect(() => {
    loadStudents();
    loadPlans();
  }, []);

  const customStyles = {
    control: provided => ({
      ...provided,
      minHeight: '41px',
    }),
    indicatorsContainer: provided => ({
      ...provided,
      height: '41px',
    }),
  };

  const endDate = useMemo(
    () => (startDate && plan ? addMonths(startDate, plan.duration) : ''),
    [plan, startDate]
  );

  const total = useMemo(
    () => (plan && plan.price ? (plan.duration * plan.price) / 100 : ''),
    [plan]
  );

  async function handleSubmit() {
    const minutes = differenceInMinutes(startDate, new Date());
    const seconds = Math.abs(differenceInSeconds(startDate, new Date()));
    let startDateFormatted = addMinutes(startDate, minutes);
    startDateFormatted = addSeconds(startDate, seconds + 1);

    console.tron.log(student);

    const data = {
      student_id: student && student.id ? student.id : student.value,
      plan_id: plan && plan.id,
      start_date: startDateFormatted,
    };

    try {
      if (!enrollment) {
        await api.post('enrollments', { ...data });
        toast.success('Nova matrícula cadastrada com sucesso!');
        history.goBack();
      } else {
        await api.put(`enrollments/${enrollment.id}`, {
          ...data,
        });
        toast.success('Matrícula atualizada com sucesso!');
      }
    } catch (err) {
      err.response.data.errors.map(error => toast.error(error.msg));
    }
  }

  return (
    <>
      <div className="actions">
        <h1 className="section-title">
          {!enrollment ? 'Cadastro de matrícula' : 'Edição de matrícula'}
        </h1>

        <div className="cta">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              history.goBack();
            }}
          >
            <MdChevronLeft size={20} /> <span>Voltar</span>
          </button>
          <button
            type="submit"
            form="add-enrollment-form"
            className="btn btn-primary"
          >
            <MdCheck size={20} /> <span>Salvar</span>
          </button>
        </div>
      </div>
      <div className="box">
        <Form id="add-enrollment-form" onSubmit={handleSubmit}>
          <Label htmlFor="student">
            Aluno
            <SelectAsync
              className="select"
              cacheOptions
              isClearable
              defaultOptions
              loadOptions={e => loadStudents(e)}
              value={student}
              onChange={e => setStudent(e)}
              placeholder="Buscar aluno"
              styles={customStyles}
            />
          </Label>
          <Grid>
            <Label htmlFor="plan">
              Plano
              <Select
                className="select"
                id="plan"
                name="plan"
                options={plans}
                getOptionLabel={option => option.title}
                getOptionValue={option => option.id}
                value={plan}
                onChange={e => setPlan(e)}
                placeholder="Selecione"
                styles={customStyles}
              />
            </Label>
            <Label htmlFor="start_date">
              Data de início
              <ReactDatePicker
                id="start_date"
                name="start_date"
                selected={startDate}
                onChange={date => setStartDate(date)}
                locale="pt"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
              />
            </Label>
            <Label htmlFor="end_date">
              Data de término
              <ReactDatePicker
                id="end_date"
                name="end_date"
                locale="pt"
                dateFormat="dd/MM/yyyy"
                selected={endDate}
                disabled
              />
            </Label>
            <Label htmlFor="total">
              Preço total
              <CurrencyFormat
                prefix="R$"
                fixedDecimalScale
                decimalSeparator=","
                decimalScale={2}
                thousandSeparator="."
                name="total"
                id="total"
                value={total}
                disabled
              />
            </Label>
          </Grid>
        </Form>
      </div>
    </>
  );
}
