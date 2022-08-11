import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  // Check if user is logged in
  // If yes, show route
  // Otherwise, redirect to login page
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
