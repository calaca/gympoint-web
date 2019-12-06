import styled from 'styled-components';
import { darken } from 'polished';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  min-height: 100%;
  background: ${colors.loggedBg};
  color: ${colors.grayDark};
`;

export const Container = styled.main`
  max-width: 100%;
  width: 1200px;
  margin: 34px auto;
  padding: 0 30px;

  .table-wrapper {
    overflow-x: auto;
  }

  table {
    background-color: ${colors.white};
    padding: 30px;
    border-radius: 4px;
    width: 100%;
    min-width: 700px;
    border-spacing: 0px;

    thead {
      text-align: left;
      color: ${colors.grayDark};
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
      color: ${colors.grayLight};
      font-size: 16px;

      tr {
        td {
          border-bottom: 1px solid ${colors.tableBorder};

          &:nth-child(3) {
            text-align: center;
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
            color: ${colors.info};

            &:hover {
              color: ${darken(0.2, colors.info)};
            }
          }

          .remove {
            color: ${colors.danger};

            &:hover {
              color: ${darken(0.2, colors.danger)};
            }
          }
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
      color: ${colors.grayDark};
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
          border: 1px solid ${colors.lines};
          background-color: ${colors.white};
          color: ${colors.gray};
          padding: 10px 10px 10px 40px;

          &::placeholder {
            color: ${colors.grayLight};
          }
        }

        svg {
          position: absolute;
          top: 13px;
          left: 32px;
          color: ${colors.grayLight};

          @media (max-width: 767.98px) {
            left: 16px;
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
        background-color: ${colors.buttonPrimary};
        color: ${colors.white};

        &:hover {
          background-color: ${darken(0.04, colors.buttonPrimary)};
        }
      }

      .btn-secondary {
        background-color: ${colors.buttonSecondary};
        color: ${colors.white};

        &:hover {
          background-color: ${darken(0.04, colors.buttonSecondary)};
        }
      }
    }
  }
`;
