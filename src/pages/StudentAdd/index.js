import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as yup from 'yup';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import { registerRequest } from '~/store/modules/student/actions';

import { Label, Grid } from './styles';

const schema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  age: yup.number().required('Idade é obrigatória'),
  weight: yup.number().required('Peso é obrigatório'),
  height: yup.number().required('Altura é obrigatório'),
});

export default function StudentAdd() {
  const history = useHistory();
  const dispatch = useDispatch();

  function handleSubmit({ name, email, age, weight, height }) {
    dispatch(registerRequest(name, email, age, weight, height));
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
            form="register-student-form"
            className="btn btn-primary"
          >
            <MdCheck size={20} /> <span>Salvar</span>
          </button>
        </div>
      </div>
      <div className="box">
        <Form
          id="register-student-form"
          onSubmit={handleSubmit}
          schema={schema}
        >
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
              Peso
              <Input type="number" name="weight" id="weight" />
            </Label>

            <Label htmlFor="height">
              Altura
              <Input type="number" name="height" id="height" />
            </Label>
          </Grid>
        </Form>
      </div>
    </>
  );
}
