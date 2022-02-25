/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TRootState } from '../../services/reducers';

type TProtectedRouteProps = {
  path: string
};

const ProtectedRoute:FC<TProtectedRouteProps> = ({ children, ...rest }) => {
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
