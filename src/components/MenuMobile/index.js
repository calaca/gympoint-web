import React from 'react';
import { useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, NavLinkStyled } from './styles';

export default function MenuMobile() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <div className="user-actions">
        <strong>Lorena Calaça</strong>
        <button type="button" onClick={handleSignOut}>
          Sair do sistema
        </button>
      </div>
      <div className="mobile-links">
        <NavLinkStyled to="/students">Alunos</NavLinkStyled>
        <NavLinkStyled to="/plans">Planos</NavLinkStyled>
        <NavLinkStyled to="/enrollments">Matrículas</NavLinkStyled>
        <NavLinkStyled to="/help-orders">Pedidos de Auxílio</NavLinkStyled>
      </div>
    </Container>
  );
}
