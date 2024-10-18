import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  // Check if user is logged in
  // If yes, show route
  // Otherwise, redirect to login page
  const arrayA = [
    { fielID: 'tt', headerName: 'thong tin' },
    { fielID: 'tt1', headerName: 'thong tin1' },
    { fielID: 'tt2', headerName: 'thong tin2' },
  ];
  const arrayB = arrayA.map((item) => item.fielID);
  console.log('arrayB', arrayB);
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  console.log('isLoginPrivteRoute', isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
