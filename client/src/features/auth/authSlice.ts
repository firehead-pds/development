import { createSlice } from '@reduxjs/toolkit/react';
import { RootState } from '../../app/store.ts';

enum Roles {
  Component = 'Component',
  Harmony = 'Harmony',
  WingChief = 'Wing Chief',
}

interface wings {
  id: number;
  name: string;
  userRole: Roles;
}

export interface AuthState {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    wingsInfo?: wings[];
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
