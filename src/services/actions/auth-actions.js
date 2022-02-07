import * as api from '../../utils/api';
import { setCookie } from '../../utils/utils';

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const GET_USER = 'GET_USER';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const REQUEST_CODE = 'REQUEST_CODE';
export const REQUEST_CODE_REQUEST = 'REQUEST_CODE_REQUEST';
export const REQUEST_CODE_FAILED = 'REQUEST_CODE_FAILED';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

export const register = (data) => (dispatch) => {
  dispatch({ type: REGISTER_USER_REQUEST });
  api.register(data)
    .then((res) => {
      if (res.success) {
        setCookie('token', res.accessToken, { expires: 1200 });
        localStorage.setItem('jwt', res.refreshToken);
        dispatch({
          type: REGISTER_USER,
          user: res.user,
        });
      }
    })
    .catch(() => dispatch({ type: REGISTER_USER_FAILED }));
};

export const login = (data) => (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });
  api.signIn(data)
    .then((res) => {
      if (res.success) {
        setCookie('token', res.accessToken, { expires: 1200 });
        localStorage.setItem('jwt', res.refreshToken);
        dispatch({
          type: LOGIN_USER,
          user: res.user,
        });
      }
    })
    .catch(() => dispatch({ type: LOGIN_USER_FAILED }));
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  api.signOut()
    .then((res) => {
      if (res.success) {
        setCookie('token', null, { expires: -1 });
        dispatch({ type: LOGOUT });
      }
    })
    .catch(() => dispatch({ type: LOGOUT_FAILED }));
};

export const refreshToken = () => (dispatch) => {
  dispatch({ type: UPDATE_TOKEN_REQUEST });
  api.updateToken()
    .then((res) => {
      if (res.success) {
        setCookie('token', res.accessToken, { expires: 1200 });
        localStorage.setItem('jwt', res.refreshToken);
        dispatch({
          type: UPDATE_TOKEN,
          user: res.user,
        });
      }
    })
    .catch(() => dispatch({ type: UPDATE_TOKEN_FAILED }));
};

export const getUser = () => (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  api.getUserInfo()
    .then((res) => {
      dispatch({
        type: GET_USER,
        user: res.user,
      });
    })
    .catch(() => {
      if (localStorage.getItem('jwt')) {
        dispatch(refreshToken());
        dispatch(getUser());
      } else {
        dispatch({ type: GET_USER_FAILED });
      }
    });
};

export const updateUser = (data) => (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  api.updateUserInfo(data)
    .then((res) => {
      dispatch({
        type: UPDATE_USER,
        user: res.user,
      });
    })
    .catch(() => {
      if (localStorage.getItem('jwt')) {
        dispatch(refreshToken());
        dispatch(updateUser(data));
      } else {
        dispatch({ type: UPDATE_USER_FAILED });
      }
    });
};

export const requestResetCode = (email) => (dispatch) => {
  dispatch({ type: REQUEST_CODE_REQUEST });
  api.requestCode(email)
    .then(() => {
      dispatch({ type: REQUEST_CODE });
    })
    .catch(() => dispatch({ type: REQUEST_CODE_FAILED }));
};

export const resetPassword = (data) => (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  api.resetPass(data)
    .then(() => {
      dispatch({ type: RESET_PASSWORD });
    })
    .catch(() => dispatch({ type: RESET_PASSWORD_FAILED }));
};
