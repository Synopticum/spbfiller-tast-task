import React, { useCallback, useEffect, useRef, useState } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import {
  fetchRectangles,
  updateRectanglePositionOnServer,
  updateRectanglePositionInStore,
} from 'src/providers/reducers/rectangles.slice';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from 'src/providers/reducers';
import List from 'src/components/List';
import { useAppDispatch as useDispatch } from 'src/providers/store';
import { throttle } from 'throttle-typescript';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import Rectangle from 'src/components/Rectangle';
import { getCurrentPosition } from 'src/pages/Home/helpers';

const Content = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const DragArea = styled.div`
  width: 100%;
  height: 400px;
  background-color: #d8d8d8;
  border-radius: 5px 5px 0 0;
  position: relative;
`;

gsap.registerPlugin(Draggable);

type Props = {};

const Home: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const rectangles = useSelector((state: RootState) => state.rectangles);
  const dragArea = useRef(null);
  const [gsapInitialized, setGsapInitialized] = useState(false);

  const updatePositionOnServer = useCallback((e: PointerEvent): void => {
    const position = getCurrentPosition(e);

    if (position) {
      dispatch(updateRectanglePositionInStore(position));
      dispatch(updateRectanglePositionOnServer(position));
    }
  }, []);

  const updatePositionInStore = useCallback((e: PointerEvent): void => {
    throttle((e: PointerEvent): void => {
      const position = getCurrentPosition(e);
      if (position) dispatch(updateRectanglePositionInStore(position));
    }, 100)(e);
  }, []);

  const renderRectangles = useCallback((ref: HTMLDivElement): void => {
    const [area] = Draggable.create('.box', {
      bounds: ref,
      type: 'x,y',
      onDrag: updatePositionInStore,
      onDragEnd: updatePositionOnServer,
    });

    area.applyBounds(ref);
    setGsapInitialized(true);
  }, []);

  useEffect(() => void dispatch(fetchRectangles()), []);

  useEffect(() => {
    if (!gsapInitialized && rectangles.length) renderRectangles(dragArea.current);
  }, [rectangles]);

  return (
    <ErrorBoundary>
      <Content>
        <DragArea ref={dragArea}>
          {rectangles.map(item => (
            <Rectangle key={item.id} model={item} />
          ))}
        </DragArea>
        <List items={rectangles} />
      </Content>
    </ErrorBoundary>
  );
};

export default Home;
