import React, { useRef } from 'react';
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
};

const Rectangle: React.FC<Props> = ({ options }) => {
  const { x, y } = options;
  const keepX = useRef(x);
  const keepY = useRef(y);

  return (
    <StyledRectangle
      className="box"
      x={keepX.current}
      y={keepY.current}
      backgroundColor={options.backgroundColor}
      width={options.width}
      height={options.height}
      id={options.id}
    />
  );
};

export default Rectangle;
