/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TRootState } from '../../services/reducers';

const ProtectedRoute:FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useSelector((store: TRootState) => store.authReducer);

  return (
    <Route
      {...rest}
      render={({ location }) => (
        isAuth
          ? (children)
          : (
            <Redirect to={{
              pathname: '/login',
              state: { from: location },
            }}
            />
          )
      )}
    />
  );
};

export default ProtectedRoute;
