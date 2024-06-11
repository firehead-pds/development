import { createSlice } from '@reduxjs/toolkit/react';
import { RootState } from '../../app/store.ts';

export interface AuthState {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // const { user } = action.payload;
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
