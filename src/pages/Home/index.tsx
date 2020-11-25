import React, { useEffect, useRef } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { asyncFetchRectangles } from 'src/providers/reducers/rectangles.slice';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { increment } from 'src/providers/reducers/filters.reducer';
import { RootState } from 'src/providers/reducers';
import List from 'src/components/List';
import { useAppDispatch as useDispatch } from 'src/providers/store';
import { unwrapResult } from '@reduxjs/toolkit';
import gsap, { TweenLite } from 'gsap';
import Draggable from 'gsap/Draggable';

const Content = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const Try = styled.div`
  cursor: pointer;
  text-decoration: underline;
`;

const Area = styled.div`
  width: 800px;
  height: 400px;
  background-color: black;
  position: relative;
  margin-top: 10px;

  .box {
    background-color: #91e600;
    text-align: center;
    font-family: Asap, Avenir, Arial, sans-serif;
    width: 196px;
    height: 100px;
    line-height: 100px;
    color: black;
    position: absolute;
    border-radius: 10px;
  }
`;

type Props = {
  increment: typeof increment;
};

gsap.registerPlugin(Draggable);

const Home: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employees);
  const refContainer = useRef(null);

  useEffect(() => {
    dispatch(asyncFetchRectangles(123));
  }, []);

  const handleAsyncFetchEmployee = (): void => {
    dispatch(asyncFetchRectangles(123))
      .then(unwrapResult)
      .then(res => console.log(res));
  };

  useEffect(() => {
    const draggables = Draggable.create('.box', {
      bounds: refContainer.current,
      type: 'x,y',
    });
    const area = draggables[0];

    area.applyBounds(refContainer.current);
  }, []);

  return (
    <ErrorBoundary>
      <Content>
        <Area ref={refContainer}>
          <div className="box" />
        </Area>
        <List items={employees} />
      </Content>
    </ErrorBoundary>
  );
};

export default Home;
