import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { apiSlice } from '../features/api/apiSlice.ts';
import { postalCodeApiSlice } from '../features/api/postalCodeApiSlice.ts';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [postalCodeApiSlice.reducerPath]: postalCodeApiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(postalCodeApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
