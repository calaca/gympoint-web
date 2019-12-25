import React from 'react';
import { useHistory } from 'react-router-dom';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import api from '~/services/api';

import Label from '~/components/Label';
import MaskInput from '~/components/MaskInput';
import { removeMask } from '~/utils/helpers';

import { Grid } from './styles';

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  age: yup
    .number('Idade deve ser um número')
    .nullable()
    .transform((value, originalValue) =>
      originalValue.trim() === '' ? null : value
    )
    .required('Idade é obrigatória'),
  weight: yup.string().required('Peso é obrigatório'),
  height: yup.string().required('Altura é obrigatório'),
});

export default function NewEdit() {
  const history = useHistory();

  async function handleSubmit({ name, email, age, weight, height }) {
    try {
      await api.post('students', {
        name,
        email,
        age,
        weight: removeMask(weight),
        height: removeMask(height),
      });

      toast.success('Novo aluno cadastrado com sucesso!');
      history.goBack();
    } catch (err) {
      err.response.data.errors.map(error => toast.error(error.msg));
    }
  }

  return (
    <>
      <div className="actions">
        <h1 className="section-title">Cadastro de aluno</h1>

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
            form="add-student-form"
            className="btn btn-primary"
          >
            <MdCheck size={20} /> <span>Salvar</span>
          </button>
        </div>
      </div>
      <div className="box">
        <Form id="add-student-form" onSubmit={handleSubmit} schema={schema}>
          <Label htmlFor="name">
            Nome completo
            <Input type="text" name="name" id="name" placeholder="Jane Doe" />
          </Label>
          <Label htmlFor="email">
            Endereço de email
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="exemplo@email.com"
            />
          </Label>
          <Grid>
            <Label htmlFor="age">
              Idade
              <Input type="number" name="age" id="age" />
            </Label>

            <Label htmlFor="weight">
              Peso <em>(em kg)</em>
              <MaskInput name="weight" inputMask="99,9kg" />
            </Label>

            <Label htmlFor="height">
              Altura
              <MaskInput name="height" inputMask="9,99m" />
            </Label>
          </Grid>
        </Form>
      </div>
    </>
  );
}
