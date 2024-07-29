import { createSlice } from '@reduxjs/toolkit/react';

export enum Roles {
  Component = 'Component',
  Harmony = 'Harmony',
  WingChief = 'Wing Chief',
}

export interface Wing {
  id: number;
  name: string;
}

export interface WingMembership {
  id: number;
  role: Roles;
  wing: Wing;
}

export interface AuthState {
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    wingMemberships?: WingMembership[];
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
    setWings: (state, action) => {
      if(state.user){
        state.user.wingMemberships = action.payload;
      }
    }
  },
  selectors: {
    selectCurrentUser: (state) => state.user,
    selectUserIsPartOfWing: (state, wingId) => {
      const { user } = state;

      if (!user || !user.wingMemberships) return null;
      const wing = user.wingMemberships.find((w) => w.wing.id === wingId);
      return wing ? wing : null;
    },
    selectHasAdminPermissionForWing: (state, wingId) => {
      const { user } = state;

      if (!user || !user.wingMemberships) return null;

      const wing = user.wingMemberships.find((wm) => wm.wing.id === wingId);
      return (
        wing && (wing.role === Roles.Harmony || wing.role === Roles.WingChief)
      );
    },
  },
});

export const { setCredentials, logOut, setWings } = authSlice.actions;
export const {
  selectCurrentUser,
  selectUserIsPartOfWing,
  selectHasAdminPermissionForWing,
} = authSlice.selectors;

export default authSlice.reducer;
