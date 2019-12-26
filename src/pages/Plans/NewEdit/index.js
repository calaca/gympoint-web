import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import CurrencyFormat from 'react-currency-format';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import api from '~/services/api';

import Label from '~/components/Label';
import { removeMask } from '~/utils/helpers';

import { Grid } from './styles';

const schema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  duration: yup
    .number()
    .moreThan(0, 'Duração deve ser maior que zero')
    .nullable()
    .transform((value, originalValue) =>
      originalValue.trim() === '' ? null : value
    )
    .required('Duração é obrigatório'),
  price: yup.string(),
});

export default function NewEdit() {
  const history = useHistory();
  const plan =
    history.location.state && history.location.state.plan
      ? history.location.state.plan
      : null;

  const [inputTitle, setInputTitle] = useState(plan ? plan.title : '');
  const [inputDuration, setInputDuration] = useState(plan ? plan.duration : '');
  const [inputPrice, setInputPrice] = useState(plan ? plan.price / 100 : '');

  async function handleSubmit({ title, duration }) {
    const data = {
      title,
      duration,
      price: Number(removeMask(inputPrice)),
    };

    try {
      if (!plan) {
        await api.post('plans', { ...data });
        toast.success('Novo plano cadastrado com sucesso!');
        history.goBack();
      } else {
        await api.put(`plans/${plan.id}`, { ...data });
        toast.success('Plano atualizado com sucesso!');
      }
    } catch (err) {
      err.response.data.errors.map(error => toast.error(error.msg));
    }
  }

  const total = useMemo(() => {
    let price;
    if (typeof inputPrice === 'string') {
      price = Number(removeMask(inputPrice)) / 100;
    } else {
      price = inputPrice;
    }
    return inputDuration * price;
  }, [inputDuration, inputPrice]);

  return (
    <>
      <div className="actions">
        <h1 className="section-title">
          {!plan ? 'Cadastro de plano' : 'Edição de plano'}
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
            form="add-plan-form"
            className="btn btn-primary"
          >
            <MdCheck size={20} /> <span>Salvar</span>
          </button>
        </div>
      </div>
      <div className="box">
        <Form id="add-plan-form" onSubmit={handleSubmit} schema={schema}>
          <Label htmlFor="title">
            Título do plano
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Exemplo"
              value={inputTitle}
              onChange={e => setInputTitle(e.target.value)}
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
                value={inputDuration}
                onChange={e => setInputDuration(e.target.value)}
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
                value={inputPrice}
                onChange={e => setInputPrice(e.target.value)}
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
