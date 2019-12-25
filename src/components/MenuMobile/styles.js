import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.div`
  background-color: ${props => props.theme.loggedBg};
  padding: 20px 30px;
  border-left: 1px solid ${props => props.theme.lines};
  position: fixed;
  height: 100%;
  width: 300px;
  top: 0;
  right: 0;
  text-align: left;
  z-index: 1;
  .mobile-links {
    margin-top: 30px;
  }
  .user-actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.lines};
    strong {
      color: ${props => props.theme.gray};
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
    }
    button {
      background-color: transparent;
      border: 0;
      font-size: 14px;
      font-weight: normal;
      color: ${props => props.theme.primary};
      transition: all 0.4s ease-in-out;
      &:hover {
        color: ${props => darken(0.14, props.theme.primary)};
      }
    }
  }
`;

export const NavLinkStyled = styled(NavLink)`
  color: ${props => props.theme.grayLight};
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
  transition: all 0.4s ease-in-out;
  display: block;
  text-align: right;
  &:hover {
    color: ${props => props.theme.primary};
  }
  &.active {
    color: ${props => props.theme.grayDark};
  }
`;
