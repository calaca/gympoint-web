import React from 'react';

import { Container, NavLinkStyled } from './styles';

export default function MenuMobile() {
  return (
    <Container>
      <div className="user-actions">
        <strong>Lorena Calaça</strong>
        <small>Sair do sistema</small>
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
