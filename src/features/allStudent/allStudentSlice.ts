import { createSlice } from '@reduxjs/toolkit';
import { Student } from 'models';
export interface AllStudent {
  loading: boolean;
  list: Student[];
}

const initialState: AllStudent = {
  loading: false,
  list: [],
};

const allStudentSlice = createSlice({
  name: 'allStudent',
  initialState,
  reducers: {
    fetchAllStudent(state) {
      state.loading = true;
    },
  },
});
//tạm thời
