import cityApi from 'api/cityApi';
import studentApi from 'api/studentApi';
import { City, ListResponse, Student } from 'models';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { dashboardActions, RankingByCity } from './dashboardSlice';

function* fetchStatistics() {
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
    // call(studentApi.getAll, {}),// nếu để ở đây thì
  ]);
  const responseList2: Array<ListResponse<Student>> = yield call(studentApi.getAll, { _sort: 'mark', _order: 'desc' });
  const statisticList: any = responseList.map((x) => x.pagination._totalRows);
  statisticList[statisticList.length] = responseList2;
  console.log(16, statisticList);

  const [maleCount, femaleCount, highMarkCount, lowMarkCount, studentCountByCityList] = statisticList;
  yield put(
    dashboardActions.setStatistics({
      maleCount,
      femaleCount,
      highMarkCount,
      lowMarkCount,
      studentCountByCityList,
    })
  );
}
function* fetchHighestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
  });
  yield put(dashboardActions.setHighestStudentList(data));
}
function* fetchLowestStudentList() {
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc',
  });
  yield put(dashboardActions.setLowestStudentList(data));
}
function* fetchRankingByCityList() {
  //Fetch city list
  const { data: cityList }: ListResponse<City> = yield call(cityApi.getAll);
  //Fetch ranking per city
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: 'mark',
      _order: 'desc',
      city: x.code,
    })
  );
  const responseList: Array<ListResponse<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = responseList.map((x, id) => ({
    cityId: cityList[id].code,
    cityName: cityList[id].name,
    rankingList: x.data,
  }));
  //Update state
  yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  try {
    yield all([call(fetchStatistics), call(fetchHighestStudentList), call(fetchLowestStudentList), call(fetchRankingByCityList)]);
    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('Failed to fetch data', error);
    yield put(dashboardActions.fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
