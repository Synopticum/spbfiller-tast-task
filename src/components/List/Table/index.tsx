import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
`;

export const Thead = styled.thead``;

export const Th = styled.th`
  padding: 15px 10px;
  text-align: left;
  background-color: #eeeeee;
  vertical-align: middle;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  &:last-of-type {
    td {
      border-bottom: 0;
      padding-bottom: 5px;
    }
  }
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
`;
