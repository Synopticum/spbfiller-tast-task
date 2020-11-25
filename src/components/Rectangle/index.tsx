import React, { useRef } from 'react';
import styled from 'styled-components';
import { Rectangle as Model } from 'src/providers/reducers/rectangles.slice';

const StyledRectangle = styled.div<Model & { initialX: number; initialY: number }>`
  position: absolute;
  left: ${({ initialX }): string => `${initialX}px`};
  top: ${({ initialY }): string => `${initialY}px`};
  background-color: ${({ backgroundColor }): string => backgroundColor};
  width: ${({ width }): string => `${width}px`};
  height: ${({ height }): string => `${height}px`};
  border-radius: 5px;
`;

type Props = {
  model: Model;
};

const Rectangle: React.FC<Props> = ({ model }) => {
  const { x, y } = model;
  const initialX = useRef(x).current;
  const initialY = useRef(y).current;

  return <StyledRectangle className="box" {...model} initialX={initialX} initialY={initialY} />;
};

export default Rectangle;
