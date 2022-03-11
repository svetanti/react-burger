/* eslint-disable default-param-last */
import { TActions } from '../actions';
import {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT,
  LOGOUT_FAILED,
  REQUEST_CODE,
  REQUEST_CODE_REQUEST,
  REQUEST_CODE_FAILED,
  RESET_PASSWORD,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILED,
  UPDATE_USER_FAILED,
  UPDATE_USER,
  UPDATE_USER_REQUEST,
  UPDATE_TOKEN,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_FAILED,
} from '../constants';

type TInitialState = {
  user: {
    name: string,
    email: string,
  };
  isRegisterRequest: boolean;
  isRegisterFailed: boolean;
  isLoginRequest: boolean;
  isLoginFailed: boolean;
  isGetUserRequest: boolean;
  isGetUserFailed: boolean;
  isUpdateUserRequest: boolean;
  isUpdateUserFailed: boolean;
  isLogoutRequest: boolean;
  isLogoutFailed: boolean;
  isCodeRequest: boolean;
  isCodeRequestFailed: boolean;
  isResetRequest: boolean;
  isResetFailed: boolean;
  isTokenRequest: boolean;
  isTokenFailed: boolean;
  isAuth: boolean;
}

const initialState: TInitialState = {
  user: {
    name: '',
    email: '',
  },
  isRegisterRequest: false,
  isRegisterFailed: false,
  isLoginRequest: false,
  isLoginFailed: false,
  isGetUserRequest: false,
  isGetUserFailed: false,
  isUpdateUserRequest: false,
  isUpdateUserFailed: false,
  isLogoutRequest: false,
  isLogoutFailed: false,
  isCodeRequest: false,
  isCodeRequestFailed: false,
  isResetRequest: false,
  isResetFailed: false,
  isTokenRequest: false,
  isTokenFailed: false,
  isAuth: false,
};

const authReducer = (state = initialState, action: TActions) => {
  switch (action.type) {
    case (REGISTER_USER): {
      return {
        ...state,
        user: action.user,
        isRegisterRequest: false,
        isRegisterFailed: false,
        isAuth: true,
      };
    }
    case (REGISTER_USER_REQUEST): {
      return { ...state, isRegisterRequest: true, isRegisterFailed: false };
    }
    case (REGISTER_USER_FAILED): {
      return { ...state, isRegisterRequest: false, isRegisterFailed: true };
    }
    case (LOGIN_USER): {
      return {
        ...state,
        user: action.user,
        isLoginRequest: false,
        isLoginFailed: false,
        isAuth: true,
      };
    }
    case (LOGIN_USER_REQUEST): {
      return {
        ...state,
        isLoginRequest: true,
        isLoginFailed: false,
      };
    }
    case (LOGIN_USER_FAILED): {
      return {
        ...state,
        isLoginRequest: false,
        isLoginFailed: true,
      };
    }
    case (GET_USER): {
      return {
        ...state,
        user: action.user,
        isAuth: true,
        isGetUserRequest: false,
        isGetUserFailed: false,
      };
    }
    case (GET_USER_REQUEST): {
      return {
        ...state,
        isGetUserRequest: true,
        isGetUserFailed: false,
      };
    }
    case (GET_USER_FAILED): {
      return {
        ...state,
        isGetUserRequest: false,
        isGetUserFailed: true,
      };
    }
    case (UPDATE_USER): {
      return {
        ...state,
        user: action.user,
        isUpdateUserRequest: false,
        isUpdateUserFailed: false,
      };
    }
    case (UPDATE_USER_REQUEST): {
      return {
        ...state,
        isUpdateUserRequest: true,
        isUpdateUserFailed: false,
      };
    }
    case (UPDATE_USER_FAILED): {
      return {
        ...state,
        isUpdateUserRequest: false,
        isUpdateUserFailed: true,
      };
    }
    case (LOGOUT): {
      return {
        ...state,
        isAuth: false,
        isLogoutRequest: false,
        isLogoutFailed: false,
      };
    }
    case (LOGOUT_REQUEST): {
      return {
        ...state,
        isLogoutRequest: true,
        isLogoutFailed: false,
      };
    }
    case (LOGOUT_FAILED): {
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutFailed: true,
      };
    }
    case (REQUEST_CODE): {
      return {
        ...state,
        isCodeRequest: false,
        isCodeRequestFailed: false,
      };
    }
    case (REQUEST_CODE_REQUEST): {
      return {
        ...state,
        isCodeRequest: true,
        isCodeRequestFailed: false,
      };
    }
    case (REQUEST_CODE_FAILED): {
      return {
        ...state,
        isCodeRequest: false,
        isCodeRequestFailed: true,
      };
    }
    case (RESET_PASSWORD): {
      return {
        ...state,
        isCodeRequest: false,
        isCodeRequestFailed: false,
      };
    }
    case (RESET_PASSWORD_REQUEST): {
      return {
        ...state,
        isResetRequest: true,
        isResetFailed: false,
      };
    }
    case (RESET_PASSWORD_FAILED): {
      return {
        ...state,
        isResetRequest: false,
        isResetFailed: true,
      };
    }
    case (UPDATE_TOKEN): {
      return {
        ...state,
        isTokenRequest: false,
        isTokenFailed: false,
      };
    }
    case (UPDATE_TOKEN_REQUEST): {
      return {
        ...state,
        isTokenRequest: true,
        isTokenFailed: false,
      };
    }
    case (UPDATE_TOKEN_FAILED): {
      return {
        ...state,
        isTokenRequest: false,
        isTokenFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
