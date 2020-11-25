import { combineReducers } from '@reduxjs/toolkit';
import employeesReducer from './rectangles.slice';
import filtersReducer from './filters.reducer';

const rootReducer = combineReducers({
  employees: employeesReducer,
  filters: filtersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
