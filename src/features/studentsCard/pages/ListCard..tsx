import { Box, makeStyles } from '@material-ui/core';
import { LinearProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { ListParams } from 'models';
import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FilterStudentCard } from '../components/FilterStudentCard';
import Pagination from '@mui/material/Pagination';
import { StudentCardLayout } from '../components/StudentCardLayout';
import {
  selectStudentCardFilter,
  selectStudentCardList,
  selectStudentCardLoading,
  selectStudentCardPagination,
  studentCardActions,
} from '../studentCardSlice';
import { selectCityList } from 'features/city/citySlice';
import { studentActions } from 'features/student/studentSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    top: '-8px',
    width: '100%',
  },
}));

export default function ListCard() {
  const loading = useAppSelector(selectStudentCardLoading);
  const filter = useAppSelector(selectStudentCardFilter);
  const pagination = useAppSelector(selectStudentCardPagination);
  console.log('pagination studentcard', pagination);
  const studentCardList = useAppSelector(selectStudentCardList);
  const cityList = useAppSelector(selectCityList);

  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(studentCardActions.fetchStudentCardList(filter));
  }, [dispatch, filter]);
  useEffect(() => {
    dispatch(studentCardActions.fetchStudentCardList(filter));
  }, [dispatch]);
  const handleSearchChange = (newFilter: ListParams) => {
    console.log('change', newFilter);
    dispatch(studentCardActions.setFilterWithDebounce(newFilter));
  };
  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    console.log(page);
    dispatch(studentCardActions.setCardFilter({ ...filter, _page: page }));
  };
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentCardActions.setCardFilter(newFilter));
  };
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <FilterStudentCard filter={filter} onSearchChange={handleSearchChange} cityList={cityList} onChange={handleFilterChange} />
      <StudentCardLayout studentCardList={studentCardList} />
      <Box my={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          page={pagination?._page}
          count={Math.ceil(pagination._totalRows / pagination._limit)}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
