import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import CurrencyFormat from 'react-currency-format';
import ReactSelect from '~/components/ReactSelect';
import { loadRequest } from '~/store/modules/students/actions';
import { Label, Grid } from './styles';

export default function EnrollmentAdd() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.enrollments.loading);
  const students = useSelector(state => state.students.students);
  const plans = useSelector(state => state.plans.plans);

  useEffect(() => {
    dispatch(loadRequest(''));
  }, [dispatch]);

  function handleSubmit(data) {
    console.tron.log(data);
  }

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
            form="register-plan-form"
            className="btn btn-primary"
          >
            <MdCheck size={20} /> <span>{loading ? 'Salvando' : 'Salvar'}</span>
          </button>
        </div>
      </div>
      <div className="box">
        <Form id="register-plan-form" onSubmit={handleSubmit}>
          <Label htmlFor="student">
            Aluno
            <ReactSelect
              className="select"
              id="student"
              name="student"
              options={students}
            />
          </Label>

          <Grid>
            <Label htmlFor="plan">
              Plano
              <ReactSelect
                className="select"
                id="plan"
                name="plan"
                options={plans}
              />
            </Label>

            <Label htmlFor="start_date">
              Data de início
              <Input placeholder="exemplo" name="start_date" id="start_date" />
            </Label>

            <Label htmlFor="end_date">
              Data de término
              <Input
                placeholder="exemplo"
                name="end_date"
                id="end_date"
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
                disabled
              />
            </Label>
          </Grid>
        </Form>
      </div>
    </>
  );
}
