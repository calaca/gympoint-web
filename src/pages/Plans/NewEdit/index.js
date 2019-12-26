import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import CurrencyInput from 'react-currency-input';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import api from '~/services/api';

import Label from '~/components/Label';
import { floatToInt } from '~/utils/helpers';

import { Grid } from './styles';

const schema = yup.object().shape({
  title: yup.string().required('Título é obrigatório'),
  duration: yup
    .number()
    .moreThan(0, 'Duração deve ser maior que zero')
    .required('Duração é obrigatório'),
  price: yup.string(),
});

export default function NewEdit() {
  const history = useHistory();
  const [inputTitle, setInputTitle] = useState();
  const [inputDuration, setInputDuration] = useState();
  const [inputPrice, setInputPrice] = useState();

  const total = useMemo(() => inputDuration * inputPrice, [
    inputDuration,
    inputPrice,
  ]);

  async function handleSubmit({ title, duration }) {
    const data = {
      title,
      duration,
      price: floatToInt(inputPrice),
    };

    try {
      await api.post('plans', { ...data });
      toast.success('Novo plano cadastrado com sucesso!');
      history.goBack();
    } catch (err) {
      err.response.data.errors.map(error => toast.error(error.msg));
    }
  }

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
              <CurrencyInput
                id="price"
                name="price"
                value={inputPrice}
                onChange={(e, maskedvalue) => setInputPrice(maskedvalue)}
                prefix="R$"
                decimalSeparator=","
                thousandSeparator="."
                precision="2"
              />
            </Label>
            <Label htmlFor="total">
              Preço total
              <CurrencyInput
                id="total"
                name="total"
                value={total}
                prefix="R$"
                decimalSeparator=","
                thousandSeparator="."
                precision="2"
                disabled
              />
            </Label>
          </Grid>
        </Form>
      </div>
    </>
  );
}
