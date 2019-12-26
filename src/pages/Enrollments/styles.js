import styled from 'styled-components';

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
              color: ${props => props.theme.success};
            }
          }
          .status-inactive {
            svg {
              color: ${props => props.theme.lines};
            }
          }
        }
      }
    }
  }
`;
