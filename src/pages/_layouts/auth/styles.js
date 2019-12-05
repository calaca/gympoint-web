import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  min-height: 100%;
  background: ${colors.notloggedBg};
  color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    background-color: ${colors.white};
    padding: 50px 30px;
    box-shadow: 0 0 20px 0 ${colors.shadow};
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
        color: ${colors.primary};
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
        color: ${colors.grayDark};
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 20px;
        line-height: 24px;
        text-transform: uppercase;

        input {
          display: block;
          width: 100%;
          border-radius: 4px;
          border: 1px solid ${colors.lines};
          padding: 10px 14px;
          font-size: 16px;
          font-weight: normal;
          color: ${colors.gray};

          &::placeholder {
            color: ${colors.grayLight};
          }
        }

        span {
          background-color: ${colors.warning};
          color: ${colors.blackLight};
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
        background-color: ${colors.primary};
        color: ${colors.white};
        padding: 10px 14px;
        font-size: 16px;
        font-weight: bold;
        border: 0;
        border-radius: 4px;
        transition: background-color 0.4s ease-in-out;

        &:hover {
          background-color: ${darken(0.04, colors.primary)};
        }

        svg {
          animation: rotate 2s linear infinite;
        }
      }
    }
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;
