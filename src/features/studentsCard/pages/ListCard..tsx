import { Box, makeStyles } from '@material-ui/core';
import { LinearProgress } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import studentApi from 'api/studentApi';
import { useAppSelector } from 'app/hooks';
import { selectCityList } from 'features/city/citySlice';
import { studentActions } from 'features/student/studentSlice';
import { ListParams, Student } from 'models';
import { ChangeEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FilterStudentCard } from '../components/FilterStudentCard';
import { StudentCardLayout } from '../components/StudentCardLayout';
import {
  selectStudentCardFilter,
  selectStudentCardList,
  selectStudentCardLoading,
  selectStudentCardPagination,
  studentCardActions,
} from '../studentCardSlice';

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

  const studentCardList = useAppSelector(selectStudentCardList);
  const cityList = useAppSelector(selectCityList);
  console.log('cityList', cityList);
  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(studentCardActions.fetchStudentCardList(filter));
  }, [dispatch, filter]);
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

  const handleRemoveStudent = async (student: Student) => {
    console.log('handle remove student ', student);
    try {
      //Remove student API + toast success
      await studentApi.remove(student?.id || '');
      //Toast message to remove successfully
      toast.success('Remove student successfully');
      //Trigger to re-fetch student list with current filter
      dispatch(studentCardActions.setCardFilter({ ...filter }));
    } catch (error) {
      toast.error('Remove student failed !');
      //Toast err
    }
  };
  const handleEditStudent = async (student: Student) => {
    navigate(`/admin/students/${student.id}`);
  };

  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <FilterStudentCard filter={filter} onSearchChange={handleSearchChange} cityList={cityList} onChange={handleFilterChange} />
      <StudentCardLayout studentCardList={studentCardList} onEdit={handleEditStudent} onRemove={handleRemoveStudent} />
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
