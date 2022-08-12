import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import studentApi from 'api/studentApi';
import { useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentFilter from '../components/StudentFilter';
import StudentTable from '../components/StudentTable';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
  },
  loading: {
    position: 'absolute',
    top: '-8px',
    width: '100%',
  },
}));
export default function ListPage() {
  const filter = useAppSelector(selectStudentFilter);
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page: number) => {
    console.log('change 1');
    dispatch(studentActions.setFilter({ ...filter, _page: page }));
  };
  const handleSearchChange = (newFilter: ListParams) => {
    console.log('change 2 ', newFilter);
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };
  const handleRemoveStudent = async (student: Student) => {
    console.log('handle remove student ', student);
    try {
      //Remove student API + toast success
      await studentApi.remove(student?.id || '');
      //Toast message to remove successfully
      toast.success('Remove student successfully');
      //Trigger to re-fetch student list with current filter
      dispatch(studentActions.setFilter({ ...filter }));
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
      {/* Loading */}
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to="/admin/students/add" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add new student
          </Button>
        </Link>
      </Box>

      <Box mb={3}>
        {/* Filter */}
        <StudentFilter cityList={cityList} filter={filter} onSearchChange={handleSearchChange} onChange={handleFilterChange} />
      </Box>

      {/* StudentTable */}
      <StudentTable studentList={studentList} cityMap={cityMap} onEdit={handleEditStudent} onRemove={handleRemoveStudent} />
      {/* Pagination    */}
      {/* totalPage = Math.ceil(totalRow/limit) */}
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
