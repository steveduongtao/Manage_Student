import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import { dashboardActions } from 'features/dashboard/dashboardSlice';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ListCard from './pages/ListCard.';

export interface StudentsCardProps {}

export default function StudentsCard(props: StudentsCardProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cityActions.fetchCityList());
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="cardList" element={<ListCard />} />
      </Routes>
    </>
  );
}
