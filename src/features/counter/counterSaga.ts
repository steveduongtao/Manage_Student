import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeEvery } from 'redux-saga/effects';
import { incrementSaga, incrementSagaSuccess } from './counterSlice';

function* handleIncrementSaga(action: PayloadAction<number>) {
  console.log('payload action ', action);
  console.log('handle increment saga');
  //   wait 2s
  yield delay(1000);
  console.log('waiting 2s done , dispatch action ');
  console.log(incrementSagaSuccess(action.payload));
  yield put(incrementSagaSuccess(action.payload));
  //dispatch 1 action
}

export default function* counterSaga() {
  console.log('counter saga');
  console.log(incrementSaga.toString());
  //   yield takeEvery(, log);
  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
}
