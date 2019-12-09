import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import CurrencyFormat from 'react-currency-format';
import formatMetricToInteger from '~/utils/formatMetricToInteger';
import currencyFormatter from '~/utils/currencyFormatter';
import { registerRequest } from '~/store/modules/plans/actions';
import { Label, Grid } from './styles';

export default function PlanAdd() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.plans.loading);
  const [durationVal, setDurationVal] = useState(1);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  function handleSubmit({ title, duration }) {
    dispatch(
      registerRequest(
        title,
        duration,
        typeof price !== 'number' ? formatMetricToInteger(price) : price
      )
    );
  }

  useMemo(() => {
    if (durationVal && price) {
      setTotal(
        currencyFormatter(
          durationVal *
            (typeof price !== 'number' ? formatMetricToInteger(price) : price)
        )
      );
    }
  }, [durationVal, price]);

  return (
    <>
      <div className="actions">
        <h1 className="section-title">Cadastro de plano</h1>

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
          <Label htmlFor="title">
            Título do plano
            <Input type="text" name="title" id="title" placeholder="Exemplo" />
          </Label>

          <Grid>
            <Label htmlFor="duration">
              Duração <em>(em meses)</em>
              <Input
                type="number"
                name="duration"
                id="duration"
                placeholder="1"
                value={durationVal}
                onChange={e => setDurationVal(e.target.value)}
              />
            </Label>

            <Label htmlFor="price">
              Preço mensal
              <CurrencyFormat
                prefix="R$"
                fixedDecimalScale
                decimalSeparator=","
                decimalScale={2}
                thousandSeparator="."
                name="price"
                id="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
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
