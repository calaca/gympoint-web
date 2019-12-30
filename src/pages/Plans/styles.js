import styled from 'styled-components';

export const TableWrapper = styled.div`
  overflow-x: auto;
  table {
    thead {
      th {
        &:nth-child(2) {
          text-align: center;
        }
      }
    }
    tbody {
      tr {
        td {
          &:nth-child(2) {
            text-align: center;
          }
        }
      }
    }
  }
`;
