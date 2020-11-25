import React from 'react';
import styled from 'styled-components';
import { Rectangle } from 'src/providers/reducers/rectangles.slice';
import { Table, Thead, Th, Tbody, Td, Tr } from './Table';

const StyledList = styled.div`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

type Props = {
  items: Rectangle[];
};

const renderRectangles = (items: Rectangle[]): React.ReactNode => {
  return items.map(({ id, width, height, x, y, backgroundColor }) => {
    return (
      <Tr key={id}>
        <Td>{id}</Td>
        <Td>{width}</Td>
        <Td>{height}</Td>
        <Td>{x}</Td>
        <Td>{y}</Td>
        <Td>{backgroundColor}</Td>
      </Tr>
    );
  });
};

const List: React.FC<Props> = ({ items }) => {
  return (
    <StyledList>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Width</Th>
            <Th>Height</Th>
            <Th>X-position</Th>
            <Th>Y-position</Th>
            <Th>Background Color</Th>
          </Tr>
        </Thead>
        <Tbody>{renderRectangles(items)}</Tbody>
      </Table>
    </StyledList>
  );
};

export default List;
