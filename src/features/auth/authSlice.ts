import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  user: {
    fullName: string;
    phoneNumber: string;
    email: string;
  } | null;
  googleUser: {
    name: string;
    picture: string;
    email: string;
  } | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  googleUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: state => {
      state.token = null;
    },
    setUser: (
      state,
      action: PayloadAction<{
        fullName: string;
        phoneNumber: string;
        email: string;
      }>,
    ) => {
      state.user = action.payload;
    },
    setGoogleUser: (
      state,
      action: PayloadAction<{
        name: string;
        picture: string;
        email: string;
      }>,
    ) => {
      state.googleUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setToken, clearToken, setUser, setGoogleUser} = authSlice.actions;

export default authSlice.reducer;
