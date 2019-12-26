import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  strong {
    font-weight: bold;
    text-transform: uppercase;
    color: ${props => props.theme.grayDark};
    font-size: 14px;
    margin-bottom: 8px;
    display: inline-block;
  }

  p {
    font-size: 16px;
    line-height: 26px;
    color: ${props => props.theme.gray};
    margin-bottom: 20px;
  }

  textarea {
    border: 1px solid ${props => props.theme.lines};
    border-radius: 4px;
    font-size: 16px;
    color: ${props => props.theme.gray};
    width: 100%;
    height: 100px;
    resize: none;
    padding: 10px 14px;

    &::placeholder {
      color: ${props => props.theme.grayLight};
    }
  }

  button {
    width: 100%;
    font-weight: bold;
    padding: 10px 16px;
    background-color: ${props => props.theme.buttonPrimary};
    color: ${props => props.theme.white};
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: all 0.4s ease-in-out;

    &:hover {
      background-color: ${props => darken(0.04, props.theme.buttonPrimary)};
    }
  }

  form {
    width: 100%;

    label {
      display: block;
      width: 100%;
      color: ${props => props.theme.grayDark};
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 20px;
      line-height: 24px;
      text-transform: uppercase;

      span {
        background-color: ${props => props.theme.warning};
        color: ${props => props.theme.blackLight};
        padding: 4px 10px;
        border-radius: 4px;
        margin-top: 4px;
        font-size: 12px;
        text-transform: none;
        display: block;
        text-align: center;
      }
    }
  }
`;
