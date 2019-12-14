import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Container = styled.div`
  strong {
    font-weight: bold;
    text-transform: uppercase;
    color: ${colors.grayDark};
    font-size: 14px;
    margin-bottom: 8px;
    display: inline-block;
  }

  p {
    font-size: 16px;
    line-height: 26px;
    color: ${colors.gray};
    margin-bottom: 20px;
  }

  textarea {
    border: 1px solid ${colors.lines};
    border-radius: 4px;
    margin-bottom: 20px;
    font-size: 16px;
    color: ${colors.gray};
    width: 100%;
    height: 100px;
    resize: none;
    padding: 10px 14px;

    &::placeholder {
      color: ${colors.grayLight};
    }
  }

  button {
    width: 100%;
    font-weight: bold;
    padding: 10px 16px;
    background-color: ${colors.buttonPrimary};
    color: ${colors.white};
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: all 0.4s ease-in-out;

    &:hover {
      background-color: ${darken(0.04, colors.buttonPrimary)};
    }
  }
`;
