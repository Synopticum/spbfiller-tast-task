import React, { useEffect, useRef } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import {
  fetchRectangles,
  updateRectanglePositionOnServer,
  updateRectanglePositionInStore,
} from 'src/providers/reducers/rectangles.slice';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { increment } from 'src/providers/reducers/filters.reducer';
import { RootState } from 'src/providers/reducers';
import List from 'src/components/List';
import { useAppDispatch as useDispatch } from 'src/providers/store';
import { throttle } from 'throttle-typescript';
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

const Home: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const rectangles = useSelector((state: RootState) => state.rectangles);
  const refContainer = useRef(null);

  const updatePositionInStore = (e: PointerEvent): void => {
    const target = e.target as HTMLDivElement;
    const { x: parentX, y: parentY } = target.parentElement.getBoundingClientRect();
    const { x: targetX, y: targetY } = target.getBoundingClientRect();
    const id = target.getAttribute('id');
    const x = Math.round(targetX) - Math.round(parentX);
    const y = Math.round(targetY) - Math.round(parentY);

    dispatch(updateRectanglePositionInStore({ id, x, y }));
  };

  const throttledUpdatePositionInStore = throttle(updatePositionInStore, 100);

  const updatePositionOnServer = (e: PointerEvent): void => {
    const target = e.target as HTMLDivElement;
    const id = target.getAttribute('id');
    const x = parseInt(target.getAttribute('x'));
    const y = parseInt(target.getAttribute('y'));

    dispatch(updateRectanglePositionOnServer({ id, x, y }));
  };

  const renderRectangles = (ref: HTMLDivElement): void => {
    const [area] = Draggable.create('.box', {
      bounds: ref,
      type: 'x,y',
      onDrag: (e: PointerEvent): void => throttledUpdatePositionInStore(e),
      onDragEnd: updatePositionOnServer,
    });

    area.applyBounds(ref);
  };

  useEffect(() => void dispatch(fetchRectangles()), []);

  useEffect(() => {
    if (rectangles.length) renderRectangles(refContainer.current);
  }, [rectangles]);

  return (
    <ErrorBoundary>
      <Content>
        <Area ref={refContainer}>
          {rectangles.map(item => (
            <Rectangle key={item.id} options={item} />
          ))}
        </Area>
        <List items={rectangles} />
      </Content>
    </ErrorBoundary>
  );
};

export default Home;
