import React from 'react';
import { Route, Navigate, PathRouteProps } from 'react-router-dom';
import { getToken } from '../services/authService';

interface PrivateRouteProps extends PathRouteProps {
  element: React.ReactNode;
  path: string; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const token = getToken();

  return (
    <Route
      {...rest}
      element={token ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
