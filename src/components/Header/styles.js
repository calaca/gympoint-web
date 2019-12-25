import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div`
  background-color: ${props => props.theme.white};
  border-bottom: 1px solid ${props => props.theme.lines};
  padding: 0 30px;
`;

export const Content = styled.div`
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 64px;
  .nav {
    display: flex;
    align-items: center;
    .logo {
      height: 24px;
    }
    &-links {
      border-left: 1px solid ${props => props.theme.lines};
      padding-left: 30px;
      margin-left: 30px;
      @media (max-width: 899px) {
        display: none;
      }
    }
  }
  aside {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    strong {
      color: ${props => props.theme.gray};
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
      @media (max-width: 899px) {
        display: none;
      }
    }
    .signout {
      background-color: transparent;
      border: 0;
      font-size: 14px;
      font-weight: normal;
      color: ${props => props.theme.primary};
      transition: all 0.4s ease-in-out;
      &:hover {
        color: ${props => darken(0.14, props.theme.primary)};
      }
      @media (max-width: 899px) {
        display: none;
      }
    }
  }
`;

export const NavLinkStyled = styled(NavLink)`
  color: ${props => props.theme.grayLight};
  font-size: 15px;
  font-weight: bold;
  margin-left: 0;
  text-transform: uppercase;
  transition: all 0.4s ease-in-out;
  &:hover {
    color: ${props => props.theme.primary};
  }
  + a {
    margin-left: 20px;
  }
  &.active {
    color: ${props => props.theme.grayDark};
  }
`;

export const MenuLink = styled.button`
  background: ${props =>
    props.isMenuActive ? props => props.theme.white : 'transparent'};
  border: 0;
  position: ${props => (props.isMenuActive ? 'absolute' : 'static')};
  right: 280px;
  top: 20px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${props =>
    props.isMenuActive ? '0px 0px 20px 0px rgba(0, 0, 0, 0.2)' : 'none'};
  z-index: 2;
  @media (min-width: 900px) {
    display: none;
  }
  svg {
    cursor: pointer;
    color: ${props => props.theme.primary};
    transition: all 0.4s ease-in-out;
    &:hover {
      color: ${props => darken(0.14, props.theme.primary)};
    }
  }
`;
