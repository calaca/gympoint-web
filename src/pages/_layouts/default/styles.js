import styled from 'styled-components';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  min-height: 100%;
  background: ${colors.loggedBg};
  color: ${colors.grayDark};

  .actions {
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .section-title {
      color: ${colors.grayDark};
      margin: 0;
    }

    .cta {
      button,
      input {
        margin-left: 16px;
        border-radius: 4px;
        padding: 10px 16px;
        font-size: 14px;
      }

      .btn {
        font-weight: bold;
        text-transform: uppercase;
      }

      .btn-primary {
        background-color: ${colors.buttonPrimary};
        color: ${colors.white};
      }

      .btn-secondary {
        background-color: ${colors.buttonSecondary};
        color: ${colors.white};
      }
    }
  }

  .box {
    background-color: ${colors.white};
    padding: 30px;
    border-radius: 4px;
  }
`;
