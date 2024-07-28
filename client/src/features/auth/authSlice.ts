import { createSlice } from '@reduxjs/toolkit/react';

export enum Roles {
  Component = 'Component',
  Harmony = 'Harmony',
  WingChief = 'Wing Chief',
}

interface Wing {
  id: number;
  name: string;
}

interface WingMember {
  id: number;
  role: Roles;
  wing: Wing;
}

export interface AuthState {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    wingsInfo?: WingMember[];
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
    getWing: (state, action) => {
      if(state.user){
        state.user.wingsInfo = action.payload;
      }
    }
  },
  selectors: {
    selectCurrentUser: (state) => state.user,
    selectUserIsPartOfWing: (state, wingId) => {
      const { user } = state;

      if (!user || !user.wingsInfo) return null;
      const wing = user.wingsInfo.find((w) => w.wing.id === wingId);
      return wing ? wing : null;
    },
    selectHasAdminPermissionForWing: (state, wingId) => {
      const { user } = state;

      if (!user || !user.wingsInfo) return null;

      const wing = user.wingsInfo.find((wm) => wm.wing.id === wingId);
      console.log(wing);
      return (
        wing && (wing.role === Roles.Harmony || wing.role === Roles.WingChief)
      );
    },
  },
});

export const { setCredentials, logOut, getWing } = authSlice.actions;
export const {
  selectCurrentUser,
  selectUserIsPartOfWing,
  selectHasAdminPermissionForWing,
} = authSlice.selectors;

export default authSlice.reducer;
