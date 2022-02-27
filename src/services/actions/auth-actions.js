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

const registerUserRequest = () => ({ type: REGISTER_USER_REQUEST });
const registerUser = (user) => ({ type: REGISTER_USER, user });
const registerUserFailed = () => ({ type: REGISTER_USER_FAILED });
const loginUserRequest = () => ({ type: LOGIN_USER_REQUEST });
const loginUser = (user) => ({ type: LOGIN_USER, user });
const loginUserFailed = () => ({ type: LOGIN_USER_FAILED });
const logoutRequest = () => ({ type: LOGOUT_REQUEST });
const logoutSuccess = () => ({ type: LOGOUT });
const logoutFailed = () => ({ type: LOGOUT_FAILED });
const updateTokenRequest = () => ({ type: UPDATE_TOKEN_REQUEST });
const updateTokenSuccess = (user) => ({ type: UPDATE_TOKEN, user });
const updateTokenFailed = () => ({ type: UPDATE_TOKEN_FAILED });
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER, user });
const getUserFailed = () => ({ type: GET_USER_FAILED });
const updateUserRequest = () => ({ type: UPDATE_USER_REQUEST });
const updateUserSuccess = (user) => ({ type: UPDATE_USER, user });
const updateUserFailed = () => ({ type: UPDATE_USER_FAILED });
const requestCodeRequest = () => ({ type: REQUEST_CODE_REQUEST });
const requestCodeSuccess = () => ({ type: REQUEST_CODE });
const requestCodeFailed = () => ({ type: REQUEST_CODE_FAILED });
const resetPasswordRequest = () => ({ type: RESET_PASSWORD_REQUEST });
const resetPasswordSuccess = () => ({ type: RESET_PASSWORD });
const resetPasswordFailed = () => ({ type: RESET_PASSWORD_FAILED });

export const register = (data) => (dispatch) => {
  dispatch(registerUserRequest());
  api.register(data)
    .then((res) => {
      if (res.success) {
        setCookie('token', res.accessToken, { expires: 1200 });
        localStorage.setItem('jwt', res.refreshToken);
        dispatch(registerUser(res.user));
      }
    })
    .catch(() => dispatch(registerUserFailed()));
};

export const login = (data) => (dispatch) => {
  dispatch(loginUserRequest());
  api.signIn(data)
    .then((res) => {
      if (res.success) {
        setCookie('token', res.accessToken, { expires: 1200 });
        localStorage.setItem('jwt', res.refreshToken);
        dispatch(loginUser(res.user));
      }
    })
    .catch(() => dispatch(loginUserFailed()));
};

export const logout = () => (dispatch) => {
  dispatch(logoutRequest());
  api.signOut()
    .then((res) => {
      if (res.success) {
        localStorage.removeItem('jwt');
        setCookie('token', null, { expires: -1 });
        dispatch(logoutSuccess());
      }
    })
    .catch(() => dispatch(logoutFailed()));
};

export const refreshToken = () => (dispatch) => {
  dispatch(updateTokenRequest());
  api.updateToken()
    .then((res) => {
      if (res.success) {
        setCookie('token', res.accessToken, { expires: 1200 });
        localStorage.setItem('jwt', res.refreshToken);
        dispatch(updateTokenSuccess(res.user));
      }
    })
    .catch(() => dispatch(updateTokenFailed()));
};

export const getUser = () => (dispatch) => {
  dispatch(getUserRequest());
  api.getUserInfo()
    .then((res) => {
      dispatch(getUserSuccess(res.user));
    })
    .catch(() => {
      if (localStorage.getItem('jwt')) {
        dispatch(refreshToken());
        api.getUserInfo()
          .then((res) => {
            dispatch(getUserSuccess(res.user));
          });
      } else {
        dispatch(getUserFailed());
      }
    });
};

export const updateUser = (data) => (dispatch) => {
  dispatch(updateUserRequest());
  api.updateUserInfo(data)
    .then((res) => {
      dispatch(updateUserSuccess(res.user));
    })
    .catch(() => {
      if (localStorage.getItem('jwt')) {
        dispatch(refreshToken());
        dispatch(updateUser(data));
      } else {
        dispatch(updateUserFailed());
      }
    });
};

export const requestResetCode = (email) => (dispatch) => {
  dispatch(requestCodeRequest());
  api.requestCode(email)
    .then(() => {
      dispatch(requestCodeSuccess());
    })
    .catch(() => dispatch(requestCodeFailed()));
};

export const resetPassword = (data) => (dispatch) => {
  dispatch(resetPasswordRequest());
  api.resetPass(data)
    .then(() => {
      dispatch(resetPasswordSuccess());
    })
    .catch(() => dispatch(resetPasswordFailed()));
};
