import React, { useEffect, useRef } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { fetchRectangles } from 'src/providers/reducers/rectangles.slice';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { increment } from 'src/providers/reducers/filters.reducer';
import { RootState } from 'src/providers/reducers';
import List from 'src/components/List';
import { useAppDispatch as useDispatch } from 'src/providers/store';
import { unwrapResult } from '@reduxjs/toolkit';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import Rectangle from 'src/components/Rectangle';

const Content = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const Area = styled.div`
  width: 100%;
  height: 400px;
  background-color: #d8d8d8;
  border-radius: 5px;
  position: relative;
  margin: 0 0 20px 0;
`;

type Props = {
  increment: typeof increment;
};

gsap.registerPlugin(Draggable);

const renderRectangles = (ref: HTMLDivElement): void => {
  const draggables = Draggable.create('.box', {
    bounds: ref,
    type: 'x,y',
  });
  const area = draggables[0];

  area.applyBounds(ref);
};

const Home: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const rectangles = useSelector((state: RootState) => state.rectangles);
  const refContainer = useRef(null);

  useEffect(() => {
    dispatch(fetchRectangles(123));
  }, []);

  const handleDrag = (): void => {
    dispatch(fetchRectangles(123))
      .then(unwrapResult)
      .then(res => console.log(res));
  };

  useEffect(() => {
    if (rectangles.length) renderRectangles(refContainer.current);
  }, [rectangles]);

  return (
    <ErrorBoundary>
      <Content>
        <Area ref={refContainer}>
          {rectangles.map(item => (
            <Rectangle key={item.id} options={item} onDrag={handleDrag} />
          ))}
        </Area>
        <List items={rectangles} />
      </Content>
    </ErrorBoundary>
  );
};

export default Home;
