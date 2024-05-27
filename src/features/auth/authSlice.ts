import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user';
export interface LoginPayload {
  username: string;
  password: string;
  navigate: any;
}
export interface LogoutPayload {
  navigate: any;
}
export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
}
const initialState: AuthState = {
  isLoggedIn: Boolean(localStorage.getItem('access_token')),
  logging: Boolean(localStorage.getItem('access_token')),
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.logging = false;
    },
    loginFailed(state, action: PayloadAction<string>) {
      state.logging = false;
    },
    logout(state, action: PayloadAction<LogoutPayload>) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

//Actions
export const authActions = authSlice.actions;
//Selector
export const selectorIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectorLogging = (state: any) => state.auth.logging;
//Reducer
const authReducer = authSlice.reducer;
export default authReducer;
