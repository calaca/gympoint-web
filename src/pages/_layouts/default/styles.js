import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  min-height: 100%;
  background: ${props => props.theme.loggedBg};
  color: ${props => props.theme.grayDark};
`;

export const Container = styled.main`
  max-width: 100%;
  width: 1200px;
  margin: 34px auto;
  padding: 0 30px;

  .table-wrapper {
    overflow-x: auto;
  }

  .box,
  table {
    background-color: ${props => props.theme.white};
    padding: 30px;
    border-radius: 4px;
    width: 100%;
  }

  table {
    border-spacing: 0px;
    min-width: 700px;

    thead {
      text-align: left;
      color: ${props => props.theme.grayDark};
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
      text-transform: uppercase;

      &:after {
        content: '';
        display: block;
        height: 10px;
      }

      th {
        &:nth-child(3) {
          text-align: center;
        }
      }
    }

    tbody {
      color: ${props => props.theme.grayLight};
      font-size: 16px;

      tr {
        td {
          border-bottom: 1px solid ${props => props.theme.tableBorder};

          &:nth-child(3) {
            text-align: center;
          }
        }

        &:last-child {
          td {
            border-bottom: 0;
          }
        }

        .actions {
          margin: 16px 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          button {
            font-size: 15px;
            text-transform: lowercase;
            background: none;
            border: none;
            margin-left: 0;
            transition: color 0.4s ease-in-out;

            + button {
              margin-left: 20px;
            }
          }

          .edit {
            color: ${props => props.theme.info};

            &:hover {
              color: ${props => darken(0.2, props.theme.info)};
            }
          }

          .remove {
            color: ${props => props.theme.danger};

            &:hover {
              color: ${props => darken(0.2, props.theme.danger)};
            }
          }
        }
      }
    }
  }

  .box {
    max-width: 100%;

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

        div {
          font-weight: normal;
          text-transform: none;
          border-color: ${props => props.theme.lines};
        }

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

          &:disabled {
            background-color: ${props => props.theme.loggedBg};
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
    }
  }
  .actions {
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .section-title {
      color: ${props => props.theme.grayDark};
      margin: 0;
    }

    .cta {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;

      @media (max-width: 767.98px) {
        width: 100%;
        justify-content: flex-start;
        margin-top: 10px;
      }

      button,
      a,
      .search {
        margin-left: 16px;
        border-radius: 4px;
        font-size: 14px;

        @media (max-width: 767.98px) {
          margin: 0 16px 0 0;
        }
      }

      .search-wrapper {
        display: flex;
        position: relative;

        .search {
          border: 1px solid ${props => props.theme.lines};
          background-color: ${props => props.theme.white};
          color: ${props => props.theme.gray};
          padding: 10px 10px 10px 40px;

          &::placeholder {
            color: ${props => props.theme.grayLight};
          }

          @media (max-width: 767.98px) {
            margin-right: 0;
          }

          @media (max-width: 415px) {
            margin-top: 10px;
          }
        }

        svg {
          position: absolute;
          top: 13px;
          left: 32px;
          color: ${props => props.theme.grayLight};

          @media (max-width: 767.98px) {
            left: 16px;
          }

          @media (max-width: 415px) {
            top: 20px;
          }
        }
      }

      .btn {
        font-weight: bold;
        text-transform: uppercase;
        border: 0;
        transition: all 0.4s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 16px;

        svg {
          margin-right: 8px;
        }
      }

      .btn-primary {
        background-color: ${props => props.theme.buttonPrimary};
        color: ${props => props.theme.white};

        &:hover {
          background-color: ${props => darken(0.04, props.theme.buttonPrimary)};
        }
      }

      .btn-secondary {
        background-color: ${props => props.theme.buttonSecondary};
        color: ${props => props.theme.white};

        &:hover {
          background-color: ${props =>
            darken(0.04, props.theme.buttonSecondary)};
        }
      }
    }
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;

    button {
      border: 0;
      transition: all 0.4s ease-in-out;
      padding: 10px 16px;
      background-color: ${props => props.theme.white};
      border-radius: 4px;
      margin: 0 5px;
      display: inline-block;

      svg {
        color: ${props => props.theme.primary};
      }

      &:hover {
        background-color: ${props => darken(0.06, props.theme.white)};
      }

      &:disabled {
        pointer-events: none;
        opacity: 0.6;
      }
    }

    span {
      font-size: 14px;
      color: ${props => props.theme.gray};
      display: inline-block;
      padding: 0 5px;
    }
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;
