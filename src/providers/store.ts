import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default store;
