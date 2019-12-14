import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import CurrencyFormat from 'react-currency-format';
import * as yup from 'yup';
import formatMetricToInteger from '~/utils/formatMetricToInteger';
import currencyFormatter from '~/utils/currencyFormatter';
import { editRequest } from '~/store/modules/plans/actions';
import { Label, Grid } from './styles';

const schema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  duration: yup
    .number()
    .moreThan(1, 'Duração deve ser maior que zero')
    .required('Duração é obrigatório'),
});

export default function PlanEdit() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.plans.loading);
  const [titleVal, setTitleVal] = useState(history.location.state.plan.title);
  const [durationVal, setDurationVal] = useState(
    history.location.state.plan.duration
  );
  const [price, setPrice] = useState(
    currencyFormatter(history.location.state.plan.price)
  );
  const [total, setTotal] = useState(0);

  function handleSubmit({ title, duration }) {
    dispatch(
      editRequest(
        {
          title,
          duration,
          price:
            typeof price !== 'number' ? formatMetricToInteger(price) : price,
        },
        history.location.state.plan.id
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
        <h1 className="section-title">Edição de plano</h1>

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
        <Form id="register-plan-form" schema={schema} onSubmit={handleSubmit}>
          <Label htmlFor="title">
            Título do plano
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Exemplo"
              value={titleVal}
              onChange={e => setTitleVal(e.target.value)}
            />
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
                fixedDecimalScale={false}
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
