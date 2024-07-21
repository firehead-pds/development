import { createSlice } from '@reduxjs/toolkit/react';

enum Roles {
  Component = 'Component',
  Harmony = 'Harmony',
  WingChief = 'Wing Chief',
}

interface wing {
  id: number;
  name: string;
  role: Roles;
}

export interface AuthState {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    wingsInfo?: wing[];
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
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
  selectors: {
    selectCurrentUser: (state) => state.user,
    selectUserIsPartOfWing: (state, wingId) => {
      const { user } = state;

      if (!user || !user.wingsInfo) return null;

      const wing = user.wingsInfo.find((w) => w.id === wingId);
      return wing ? wing : null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const { selectCurrentUser, selectUserIsPartOfWing } =
  authSlice.selectors;

export default authSlice.reducer;
