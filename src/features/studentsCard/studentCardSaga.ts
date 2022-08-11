import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { studentCardActions } from './studentCardSlice';

function* fetchStudentCardList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    console.log('response StudentCard', response);
    yield put(studentCardActions.fetchStudentCardSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentCardActions.fetchStudentCardFailed('error'));
  }
}
function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(studentCardActions.setCardFilter(action.payload));
}

export default function* studentCardSaga() {
  //Watch fetch studentCard action
  yield takeLatest(studentCardActions.fetchStudentCardList.type, fetchStudentCardList);
  yield debounce(800, studentCardActions.setFilterWithDebounce.type, handleSearchDebounce);
}
