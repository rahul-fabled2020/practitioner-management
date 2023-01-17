import { FunctionComponent } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

interface ProtectedRouteProps {
  children?: any;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isLoggedIn()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
