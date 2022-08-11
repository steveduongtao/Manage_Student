import authSaga from 'features/auth/authSaga';
import citySaga from 'features/city/citySaga';
import dashboardSaga from 'features/dashboard/dashboardSaga';
import studentSaga from 'features/student/studentSaga';
import studentCardSaga from 'features/studentsCard/studentCardSaga';
import { all } from 'redux-saga/effects';
// function* helloSaga() {
//   console.log('hello saga');
// }

export default function* rootSaga() {
  yield all([authSaga(), dashboardSaga(), studentSaga(), citySaga(), studentCardSaga()]);
}
