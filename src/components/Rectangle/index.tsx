import React from 'react';
import styled from 'styled-components';
import { Rectangle as Options } from 'src/providers/reducers/rectangles.slice';

const StyledRectangle = styled.div<Options>`
  position: absolute;
  left: ${({ x }): string => `${x}px`};
  top: ${({ y }): string => `${y}px`};
  background-color: ${({ backgroundColor }): string => backgroundColor};
  width: ${({ width }): string => `${width}px`};
  height: ${({ height }): string => `${height}px`};
  border-radius: 5px;
`;

type Props = {
  options: Options;
  onDrag: () => void;
};

const Rectangle: React.FC<Props> = ({ options }) => {
  return <StyledRectangle className="box" {...options} />;
};

export default Rectangle;
