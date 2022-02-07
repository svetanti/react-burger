/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../services/actions/auth-actions';

function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.authReducer);

  useEffect(() => {
    dispatch(getUser());
  }, []);

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
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
