import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  min-height: 100%;
  background: ${props => props.theme.notloggedBg};
  color: ${props => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    background-color: ${props => props.theme.white};
    padding: 50px 30px;
    box-shadow: 0 0 20px 0 ${props => props.theme.shadow};
    max-width: 100%;
    width: 360px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin: 0 20px;
    .logo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-bottom: 26px;
      img {
        width: 100px;
        margin-bottom: 12px;
      }
      h1 {
        color: ${props => props.theme.primary};
        text-transform: uppercase;
        font-weight: bold;
        font-size: 30px;
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
        input {
          display: block;
          width: 100%;
          border-radius: 4px;
          border: 1px solid ${props => props.theme.lines};
          padding: 10px 14px;
          font-size: 16px;
          font-weight: normal;
          color: ${props => props.theme.gray};
          &::placeholder {
            color: ${props => props.theme.grayLight};
          }
        }
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
      button {
        display: block;
        width: 100%;
        margin: 0 auto;
        background-color: ${props => props.theme.primary};
        color: ${props => props.theme.white};
        padding: 10px 14px;
        font-size: 16px;
        font-weight: bold;
        border: 0;
        border-radius: 4px;
        transition: background-color 0.4s ease-in-out;

        &:hover {
          background-color: ${props => darken(0.04, props.theme.primary)};
        }

        svg {
          animation: spin 2s linear infinite;
        }
      }
    }
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
