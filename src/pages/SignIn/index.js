import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as yup from 'yup';
import { MdSync } from 'react-icons/md';
import { Label } from './styles';
import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
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

        <button type="submit">
          {loading ? <MdSync /> : 'Entrar no sistema'}
        </button>
      </Form>
    </div>
  );
}
