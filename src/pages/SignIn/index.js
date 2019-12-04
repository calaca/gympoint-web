import React from 'react';
import logo from '~/assets/logo.svg';

export default function SignIn() {
  return (
    <div className="box">
      <div className="logo">
        <img src={logo} alt="Gympoint" />
        <h1>Gympoint</h1>
      </div>

      <form>
        <label htmlFor="email">
          Seu e-mail
          <input
            type="email"
            name="email"
            id="email"
            placeholder="exemplo@email.com"
            required
          />
        </label>

        <label htmlFor="password">
          Sua senha
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*************"
            required
          />
        </label>

        <button type="submit">Entrar no sistema</button>
      </form>
    </div>
  );
}
