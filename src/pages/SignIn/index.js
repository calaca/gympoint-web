import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import Label from '~/components/Label';

import logo from '~/assets/logo.svg';

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

      <Form onSubmit={handleSubmit}>
        <Label htmlFor="email">
          Seu e-mail
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="exemplo@email.com"
            required
          />
        </Label>

        <Label htmlFor="password">
          Sua senha
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="*************"
            required
          />
        </Label>

        <button type="submit">Entrar no sistema</button>
      </Form>
    </div>
  );
}
