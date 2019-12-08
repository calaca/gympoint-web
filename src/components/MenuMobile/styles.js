import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Container = styled.div`
  background-color: ${colors.loggedBg};
  padding: 20px 30px;
  border-left: 1px solid ${colors.lines};
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
    border-bottom: 1px solid ${colors.lines};

    strong {
      color: ${colors.gray};
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 4px;
    }

    small {
      cursor: pointer;
      font-size: 14px;
      font-weight: normal;
      color: ${colors.primary};
      transition: all 0.4s ease-in-out;

      &:hover {
        color: ${darken(0.14, colors.primary)};
      }
    }
  }
`;

export const NavLinkStyled = styled(NavLink)`
  color: ${colors.grayLight};
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
  transition: all 0.4s ease-in-out;
  display: block;
  text-align: right;

  &:hover {
    color: ${colors.primary};
  }

  &.active {
    color: ${colors.grayDark};
  }
`;
