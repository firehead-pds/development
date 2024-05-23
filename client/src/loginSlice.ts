import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store.ts';

export interface LogState {
  logged: boolean;
}

// Define the initial state using that type
const initialState: LogState = {
  logged: false,
};

const loginSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    login: (state) => {
      state.logged = true;
    },
    logout: (state) => {
      state.logged = false;
    },
  },
});
export const selectLog = (state: RootState) => state.logged;

export default loginSlice.reducer;
export const { login, logout } = loginSlice.actions;
