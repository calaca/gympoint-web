import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';

import { Container, Content, NavLinkStyled, MenuLink } from './styles';

import { signOut } from '~/store/modules/auth/actions';
import MenuMobile from '~/components/MenuMobile';
import logo from '~/assets/logo_horizontal.svg';

export default function Header() {
  const [menu, setMenu] = useState(false);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  function handleMenuMobile() {
    setMenu(!menu);
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav className="nav">
          <Link to="/">
            <img className="logo" src={logo} alt="Gympoint" />
          </Link>

          <div className="nav-links">
            <NavLinkStyled to="/students">Alunos</NavLinkStyled>
            <NavLinkStyled to="/plans">Planos</NavLinkStyled>
            <NavLinkStyled to="/enrollments">Matrículas</NavLinkStyled>
            <NavLinkStyled to="/help-orders">Pedidos de Auxílio</NavLinkStyled>
          </div>
        </nav>
        <aside>
          <strong>{user.name}</strong>
          <button className="signout" type="button" onClick={handleSignOut}>
            Sair do sistema
          </button>
          <MenuLink
            type="button"
            className="menu-link"
            onClick={handleMenuMobile}
            isMenuActive={menu}
          >
            {menu ? <MdClose size={32} /> : <MdMenu size={32} />}
          </MenuLink>
        </aside>
        {menu && <MenuMobile />}
      </Content>
    </Container>
  );
}
