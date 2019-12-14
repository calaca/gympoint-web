import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form } from '@rocketseat/unform';
import CurrencyFormat from 'react-currency-format';
import SelectAsync from 'react-select/async';
import Select from 'react-select';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import {
  addMonths,
  differenceInMinutes,
  differenceInSeconds,
  addSeconds,
  addMinutes,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import currencyFormatter from '~/utils/currencyFormatter';
import { loadRequest } from '~/store/modules/plans/actions';
import { registerRequest } from '~/store/modules/enrollments/actions';
import { Label, Grid } from './styles';

export default function EnrollmentAdd() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.enrollments.loading);
  const plans = useSelector(state => state.plans.plans);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const [student, setStudent] = useState();
  const [plan, setPlan] = useState();
  const [total, setTotal] = useState(0);
  registerLocale('pt', pt);

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

  useEffect(() => {
    loadStudents();
    dispatch(loadRequest());
  }, [dispatch]);

  useMemo(() => {
    if (startDate && plan) {
      setEndDate(addMonths(startDate, plan.duration));
    }
  }, [startDate, plan]);

  useMemo(() => {
    if (plan && plan.price) {
      setTotal(currencyFormatter(plan.duration * plan.price));
    }
  }, [plan]);

  function handleSubmit() {
    const minutes = differenceInMinutes(startDate, new Date());
    const seconds = Math.abs(differenceInSeconds(startDate, new Date()));
    let startDateFormatted = addMinutes(startDate, minutes);
    startDateFormatted = addSeconds(startDate, seconds + 1);

    dispatch(
      registerRequest(
        student && student.id,
        plan && plan.id,
        startDateFormatted
      )
    );
  }

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

  return (
    <>
      <div className="actions">
        <h1 className="section-title">Cadastro de matrícula</h1>

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
            form="register-enrollment-form"
            className="btn btn-primary"
          >
            <MdCheck size={20} /> <span>{loading ? 'Salvando' : 'Salvar'}</span>
          </button>
        </div>
      </div>
      <div className="box">
        <Form id="register-enrollment-form" onSubmit={handleSubmit}>
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
              Valor final
              <CurrencyFormat
                prefix="R$"
                fixedDecimalScale
                decimalSeparator=","
                decimalScale={2}
                thousandSeparator="."
                name="total"
                id="total"
                value={total}
                onChange={e => setTotal(e.target.value)}
                disabled
              />
            </Label>
          </Grid>
        </Form>
      </div>
    </>
  );
}
