import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';
import colors from './colors';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-datepicker/dist/react-datepicker.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *:focus {
    outline: 0;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body,
  input,
  button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  .Toastify__toast {
    border-radius: 4px !important;
  }

  .react-confirm-alert-button-group > button {
    background: ${colors.buttonPrimary} !important;
    text-transform: uppercase;
    font-weight: bold;
    transition: background 0.4s ease-in-out;

    &:hover {
      background: ${darken(0.04, colors.buttonPrimary)} !important;
    }

    &:last-child {
      background: ${colors.loggedBg} !important;
      color: ${colors.grayLight} !important;

      &:hover {
        background: ${darken(0.04, colors.loggedBg)} !important;
      }
    }
  }
`;
