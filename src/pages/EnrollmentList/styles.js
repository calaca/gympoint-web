import styled from 'styled-components';
import colors from '~/styles/colors';

export const TableWrapper = styled.div`
  table {
    thead {
      th {
        text-align: center;

        &:nth-child(1) {
          text-align: left;
        }
      }
    }
    tbody {
      tr {
        td {
          text-align: center;

          &:nth-child(1) {
            text-align: left;
          }

          .status-active {
            svg {
              color: ${colors.success};
            }
          }

          .status-inactive {
            svg {
              color: ${colors.lines};
            }
          }
        }
      }
    }
  }
`;
