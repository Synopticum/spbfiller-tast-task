import { combineReducers } from '@reduxjs/toolkit';
import rectanglesReducer from './rectangles.slice';
import filtersReducer from './filters.reducer';

const rootReducer = combineReducers({
  rectangles: rectanglesReducer,
  filters: filtersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
