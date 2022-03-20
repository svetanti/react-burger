import * as api from '../../utils/api';
import { setCookie } from '../../utils/utils';
import { TUser } from '../../types/types';
import {
  GET_USER,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  LOGIN_USER,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGOUT,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REQUEST_CODE,
  REQUEST_CODE_FAILED,
  REQUEST_CODE_REQUEST,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  UPDATE_TOKEN,
  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_USER,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
} from '../constants';
import { AppThunk } from '../types';

export interface IRegisterUserRequest {
  readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUser {
  readonly type: typeof REGISTER_USER;
  readonly user: TUser;
}
export interface IRegisterUserFailed {
  readonly type: typeof REGISTER_USER_FAILED;
}
export interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUser {
  readonly type: typeof LOGIN_USER;
  readonly user: TUser;
}
export interface ILoginUserFailed {
  readonly type: typeof LOGIN_USER_FAILED;
}
export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogout {
  readonly type: typeof LOGOUT;
}
export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}
export interface IUpdateTokenRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}
export interface IUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN;
  readonly user: TUser;
}
export interface IUpdateTokenFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}
export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccess {
  readonly type: typeof GET_USER;
  readonly user: TUser;
}
export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}
export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER;
  readonly user: TUser;
}
export interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}
export interface IRequestCodeRequest {
  readonly type: typeof REQUEST_CODE_REQUEST;
}
export interface IRequestCodeSuccess {
  readonly type: typeof REQUEST_CODE;
}
export interface IRequestCodeFailed {
  readonly type: typeof REQUEST_CODE_FAILED;
}
export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD;
}
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

const registerUserRequest = (): IRegisterUserRequest => ({ type: REGISTER_USER_REQUEST });
const registerUser = (user: TUser): IRegisterUser => ({ type: REGISTER_USER, user });
const registerUserFailed = (): IRegisterUserFailed => ({ type: REGISTER_USER_FAILED });
const loginUserRequest = (): ILoginUserRequest => ({ type: LOGIN_USER_REQUEST });
const loginUser = (user: TUser): ILoginUser => ({ type: LOGIN_USER, user });
const loginUserFailed = (): ILoginUserFailed => ({ type: LOGIN_USER_FAILED });
const logoutRequest = (): ILogoutRequest => ({ type: LOGOUT_REQUEST });
const logoutSuccess = (): ILogout => ({ type: LOGOUT });
const logoutFailed = (): ILogoutFailed => ({ type: LOGOUT_FAILED });
const updateTokenRequest = (): IUpdateTokenRequest => ({ type: UPDATE_TOKEN_REQUEST });
const updateTokenSuccess = (user: TUser): IUpdateTokenSuccess => ({ type: UPDATE_TOKEN, user });
const updateTokenFailed = (): IUpdateTokenFailed => ({ type: UPDATE_TOKEN_FAILED });
const getUserRequest = (): IGetUserRequest => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user: TUser): IGetUserSuccess => ({ type: GET_USER, user });
const getUserFailed = (): IGetUserFailed => ({ type: GET_USER_FAILED });
const updateUserRequest = (): IUpdateUserRequest => ({ type: UPDATE_USER_REQUEST });
const updateUserSuccess = (user: TUser): IUpdateUserSuccess => ({ type: UPDATE_USER, user });
const updateUserFailed = (): IUpdateUserFailed => ({ type: UPDATE_USER_FAILED });
const requestCodeRequest = (): IRequestCodeRequest => ({ type: REQUEST_CODE_REQUEST });
const requestCodeSuccess = (): IRequestCodeSuccess => ({ type: REQUEST_CODE });
const requestCodeFailed = (): IRequestCodeFailed => ({ type: REQUEST_CODE_FAILED });
const resetPasswordRequest = (): IResetPasswordRequest => ({ type: RESET_PASSWORD_REQUEST });
const resetPasswordSuccess = (): IResetPasswordSuccess => ({ type: RESET_PASSWORD });
const resetPasswordFailed = (): IResetPasswordFailed => ({ type: RESET_PASSWORD_FAILED });

export const register: AppThunk = (data) => (dispatch) => {
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

export const login: AppThunk = (data) => (dispatch) => {
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

export const logout: AppThunk = () => (dispatch) => {
  dispatch(logoutRequest());
  api.signOut()
    .then((res) => {
      if (res.success) {
        localStorage.removeItem('jwt');
        setCookie('token', '', { expires: -1 });
        dispatch(logoutSuccess());
      }
    })
    .catch(() => dispatch(logoutFailed()));
};

export const refreshToken: AppThunk = () => (dispatch) => {
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

export const getUser: AppThunk = () => (dispatch) => {
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

export const updateUser: AppThunk = (data) => (dispatch) => {
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

export const requestResetCode: AppThunk = (email) => (dispatch) => {
  dispatch(requestCodeRequest());
  api.requestCode(email)
    .then(() => {
      dispatch(requestCodeSuccess());
    })
    .catch(() => dispatch(requestCodeFailed()));
};

export const resetPassword: AppThunk = (data) => (dispatch) => {
  dispatch(resetPasswordRequest());
  api.resetPass(data)
    .then(() => {
      dispatch(resetPasswordSuccess());
    })
    .catch(() => dispatch(resetPasswordFailed()));
};
