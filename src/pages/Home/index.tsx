import React, { useEffect } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { asyncFetchRectangles } from 'src/providers/reducers/rectangles.slice';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { increment } from 'src/providers/reducers/filters.reducer';
import { RootState } from 'src/providers/reducers';
import List from 'src/components/List';
import { useAppDispatch as useDispatch } from 'src/providers/store';
import { unwrapResult } from '@reduxjs/toolkit';

const Content = styled.div`
  width: 100%;
  overflow-y: auto;
`;

const Try = styled.div`
  cursor: pointer;
  text-decoration: underline;
`;

type Props = {
  increment: typeof increment;
};

const Home: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    dispatch(asyncFetchRectangles(123));
  }, []);

  const handleAsyncFetchEmployee = (): void => {
    dispatch(asyncFetchRectangles(123))
      .then(unwrapResult)
      .then(res => console.log(res));
  };

  return (
    <ErrorBoundary>
      <Content>
        <List items={employees} />
      </Content>
    </ErrorBoundary>
  );
};

export default Home;
