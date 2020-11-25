import { combineReducers } from '@reduxjs/toolkit';
import rectanglesReducer from './rectangles.slice';

const rootReducer = combineReducers({
  rectangles: rectanglesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
