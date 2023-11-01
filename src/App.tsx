import { Notfound, PrivateRoute } from 'components/Common';
import { AdminLayou } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import Dashboard from 'features/dashboard';
import Students from 'features/student';
import StudentsCard from 'features/studentsCard';
import { Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminLayou />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/students/*" element={<Students />} />
            <Route path="/admin/*" element={<StudentsCard />} />
          </Route>
        </Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </>
  );
}

export default App;
