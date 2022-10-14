import Conteiner from './Conteiner/Conteiner';
import MainPage from '../pages/MainPage';
import TransactionHistoryPage from '../pages/TransactionHistoryPage';
import { Navigate, Route, Routes} from 'react-router-dom';
import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth/authSelectors';


export const App = () => {
  const isLoggedIn = useSelector(getIsLoggedIn)
  return (
    <Conteiner>
      <>
        <Routes>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/transaction/*"
            element={
              <PrivateRoute >
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/history/:transactionType"
            element={
              <PrivateRoute>
                <TransactionHistoryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="*" element = {isLoggedIn ? <Navigate to="/transaction"/>:<Navigate to="/login"/>} />
        </Routes>
      </>
    </Conteiner>
  );
};
