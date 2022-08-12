import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';

export interface StudentCardState {
  loading: boolean;
  list: Student[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: StudentCardState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 20,
  },
  pagination: {
    _page: 1,
    _limit: 20,
    _totalRows: 15,
  },
};

const studentCardSlice = createSlice({
  name: 'studentCard',
  initialState,
  reducers: {
    fetchStudentCardList(state, action: PayloadAction<ListParams>) {
      console.log('studentSlice', action);
      state.loading = true;
    },
    fetchStudentCardSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      state.loading = false;
      console.log(25, action.payload.data);
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchStudentCardFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      // state.list = action.payload.data;
    },
    setCardFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
      // state.list = action.payload.data;
    },
    setFilterWithDebounce(state, action: PayloadAction<ListParams>) {},
  },
});
//Action
export const studentCardActions = studentCardSlice.actions;
//Selectors
export const selectStudentCardLoading = (state: RootState) => state.studentCard.loading;
export const selectStudentCardList = (state: RootState) => state.studentCard.list;
export const selectStudentCardFilter = (state: RootState) => state.studentCard.filter;
export const selectStudentCardPagination = (state: RootState) => state.studentCard.pagination;
//Reducer
const studentCardReducer = studentCardSlice.reducer;
export default studentCardReducer;
