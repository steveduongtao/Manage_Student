import { PayloadAction } from '@reduxjs/toolkit';
import { authActions, LoginPayload, LogoutPayload } from 'features/auth/authSlice';
import { call, delay, put, take } from 'redux-saga/effects';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(500);
    console.log('handle login ', payload);
    localStorage.setItem('access_token', 'fake token ');
    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Duong The Tao',
      })
    );
    //redirect to admin page
    yield call(function () {
      payload.navigate('/admin/dashboard');
    });
  } catch (error) {
    yield put(authActions.loginFailed('loiroi'));
  }
}

function* handleLogout(payload: LogoutPayload) {
  try {
    console.log('handle logout');
    localStorage.removeItem('access_token');
    //redirect to login page
    yield call(function () {
      payload.navigate('/login');
    });
  } catch (error) {
    yield put(authActions.loginFailed('error - handle logout'));
  }
}
function* watchLoginFlow() {
  while (true) {
    let isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (isLoggedIn) {
      console.log('da login');
      const action: PayloadAction<LogoutPayload> = yield take(authActions.logout.type);
      yield call(handleLogout, action.payload);
    } else {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield call(handleLogin, action.payload);
    }
  }
}

export default function* authSaga() {
  console.log('auth saga');
  yield call(watchLoginFlow);
}
