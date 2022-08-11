import { Box } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

export default function StudentsFeather() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);
  return (
    <Box>
      <Routes>
        <Route path="list" element={<ListPage />}></Route>
        <Route path="add" element={<AddEditPage />}></Route>
        <Route path=":studentId" element={<AddEditPage />}></Route>
      </Routes>
    </Box>
  );
}
