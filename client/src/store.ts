import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice.ts';

export const store = configureStore({
  reducer: loginReducer,
});

store.subscribe(() => {
  console.log('Funciono');
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
