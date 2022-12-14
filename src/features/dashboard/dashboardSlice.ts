import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { Student } from 'models';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
  maleHn: number;
  femaleHn: number;
  maleHcm: number;
  femaleHcm: number;
  malePt: number;
  femalePt: number;
  maleDn: number;
  femaleDn: number;
  studentCountByCityList: Student[];
}

export interface RankingByCity {
  cityId: string;
  cityName: string;
  rankingList: Student[];
}
export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentList: Student[];
  rankingByCityList: RankingByCity[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
    maleHn: 0,
    femaleHn: 0,
    maleHcm: 0,
    femaleHcm: 0,
    malePt: 0,
    femalePt: 0,
    maleDn: 0,
    femaleDn: 0,
    studentCountByCityList: [],
  },
  highestStudentList: [],
  lowestStudentList: [],
  rankingByCityList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state) {
      state.loading = true;
    },
    fetchDataSuccess(state) {
      state.loading = false;
    },
    fetchDataFailed(state) {
      state.loading = false;
    },
    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload;
    },
    setHighestStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload;
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentList = action.payload;
    },
    setRankingByCityList(state, action: PayloadAction<RankingByCity[]>) {
      state.rankingByCityList = action.payload;
    },
  },
});
//Actions
export const dashboardActions = dashboardSlice.actions;
//Selectors
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics;
export const selectHighestStudentList = (state: RootState) => state.dashboard.highestStudentList;
export const selectLowestStudentList = (state: RootState) => state.dashboard.lowestStudentList;
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList;
export const selectRankingStudentList = (state: RootState) =>
  state.dashboard.statistics.studentCountByCityList.reduce((map: { [key: string]: number }, student: any, index) => {
    map[student.id || 'unknown'] = index + 1;
    return map;
  }, {});

//Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
