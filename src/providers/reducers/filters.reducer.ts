import { createReducer, createAction } from '@reduxjs/toolkit';

export const increment = createAction('INCREMENT');
export const decrement = createAction('DECREMENT');

const filtersReducer = createReducer(0, {
  [increment.type]: state => state + 1,
  [decrement.type]: state => state - 1,
});

export default filtersReducer;
