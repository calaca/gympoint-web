import styled from 'styled-components';

export const Label = styled.label`
  em {
    text-transform: none;
    font-style: normal;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;

  @media (max-width: 767.98px) {
    grid-template-columns: 1fr;
  }
`;
