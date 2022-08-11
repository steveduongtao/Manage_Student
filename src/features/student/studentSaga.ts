import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/studentApi';
import { ListParams, ListResponse, Student } from 'models';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { studentActions } from './studentSlice';

function* fetchStudentList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
    console.log(11, response);
    yield put(studentActions.fetchStudentListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch student list', error);
    yield put(studentActions.fetchStudentListFailed('error'));
  }
}
function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  console.log('student saga debounce', { ...action.payload, name_like: action.payload.name_like.trim() });
  //yield put(studentActions.setFilter(action.payload)); // nó sẽ thay đổi vào fetch lại list api
  yield put(studentActions.setFilter({ ...action.payload, name_like: action.payload.name_like.trim() })); // nó sẽ thay đổi vào fetch lại list api
}

export default function* studentSaga() {
  //watch fetch student action
  yield takeLatest(studentActions.fetchStudentList.type, fetchStudentList);
  yield debounce(500, studentActions.setFilterWithDebounce.type, handleSearchDebounce);
}
