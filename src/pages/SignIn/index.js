import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as yup from 'yup';
import { Label } from './styles';
import logo from '~/assets/logo.svg';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <div className="box">
      <div className="logo">
        <img src={logo} alt="Gympoint" />
        <h1>Gympoint</h1>
      </div>

      <Form onSubmit={handleSubmit} schema={schema}>
        <Label htmlFor="email">
          Seu email
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="exemplo@email.com"
          />
        </Label>

        <Label htmlFor="password">
          Sua senha
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="*************"
          />
        </Label>

        <button type="submit">Entrar no sistema</button>
      </Form>
    </div>
  );
}
