import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logOut: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;
