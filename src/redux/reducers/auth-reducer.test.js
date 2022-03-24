import authReducer from './auth-reducer';
import * as types from '../constants';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(
      {
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
        isAuth: null,
      },
    );
  });

  it('should handle REGISTER_USER', () => {
    expect(
      authReducer({}, {
        type: types.REGISTER_USER,
        user: {
          name: 'Жак-Ив Кусто',
          email: 'ji@kus.to',
        },
      }),
    ).toEqual(
      {
        user: {
          name: 'Жак-Ив Кусто',
          email: 'ji@kus.to',
        },
        isRegisterRequest: false,
        isRegisterFailed: false,
        isAuth: true,
      },
    );
  });

  it('should handle REGISTER_USER_REQUEST', () => {
    expect(
      authReducer({}, {
        type: types.REGISTER_USER_REQUEST,
      }),
    ).toEqual(
      {
        isRegisterRequest: true, isRegisterFailed: false,
      },
    );
  });

  it('should handle REGISTER_USER_FAILED', () => {
    expect(
      authReducer({}, {
        type: types.REGISTER_USER_FAILED,
      }),
    ).toEqual(
      {
        isRegisterRequest: false, isRegisterFailed: true,
      },
    );
  });

  it('should handle LOGIN_USER', () => {
    expect(
      authReducer({}, {
        type: types.LOGIN_USER,
        user: {
          name: 'Жак-Ив Кусто',
          email: 'ji@kus.to',
        },
      }),
    ).toEqual(
      {
        user: {
          name: 'Жак-Ив Кусто',
          email: 'ji@kus.to',
        },
        isLoginRequest: false,
        isLoginFailed: false,
        isAuth: true,
      },
    );
  });

  it('should handle LOGIN_USER_REQUEST', () => {
    expect(
      authReducer({}, {
        type: types.LOGIN_USER_REQUEST,
      }),
    ).toEqual(
      {
        isLoginRequest: true,
        isLoginFailed: false,
      },
    );
  });

  it('should handle LOGIN_USER_FAILED', () => {
    expect(
      authReducer({}, {
        type: types.LOGIN_USER_FAILED,
      }),
    ).toEqual(
      {
        isLoginRequest: false,
        isLoginFailed: true,
      },
    );
  });

  it('should handle GET_USER', () => {
    expect(
      authReducer({}, {
        type: types.GET_USER,
        user: {
          name: 'Жак-Ив Кусто',
          email: 'ji@kus.to',
        },
      }),
    ).toEqual(
      {
        user: {
          name: 'Жак-Ив Кусто',
          email: 'ji@kus.to',
        },
        isGetUserRequest: false,
        isGetUserFailed: false,
        isAuth: true,
      },
    );
  });

  it('should handle GET_USER_REQUEST', () => {
    expect(
      authReducer({}, {
        type: types.GET_USER_REQUEST,
      }),
    ).toEqual(
      {
        isGetUserRequest: true,
        isGetUserFailed: false,
      },
    );
  });

  it('should handle GET_USER_FAILED', () => {
    expect(
      authReducer({}, {
        type: types.GET_USER_FAILED,
      }),
    ).toEqual(
      {
        isGetUserRequest: false,
        isGetUserFailed: true,
      },
    );
  });

  it('should handle UPDATE_USER', () => {
    expect(
      authReducer({}, {
        type: types.UPDATE_USER,
        user: {
          name: 'Жак-Ив Кусто',
          email: 'ji@kus.to',
        },
      }),
    ).toEqual(
      {
        user: {
          name: 'Жак-Ив Кусто',
          email: 'ji@kus.to',
        },
        isUpdateUserRequest: false,
        isUpdateUserFailed: false,
      },
    );
  });

  it('should handle UPDATE_USER_REQUEST', () => {
    expect(
      authReducer({}, {
        type: types.UPDATE_USER_REQUEST,
      }),
    ).toEqual(
      {
        isUpdateUserRequest: true,
        isUpdateUserFailed: false,
      },
    );
  });

  it('should handle UPDATE_USER_FAILED', () => {
    expect(
      authReducer({}, {
        type: types.UPDATE_USER_FAILED,
      }),
    ).toEqual(
      {
        isUpdateUserRequest: false,
        isUpdateUserFailed: true,
      },
    );
  });

  it('should handle LOGOUT', () => {
    expect(
      authReducer({}, {
        type: types.LOGOUT,
      }),
    ).toEqual(
      {
        isAuth: false,
        isLogoutRequest: false,
        isLogoutFailed: false,
      },
    );
  });

  it('should handle LOGOUT_REQUEST', () => {
    expect(
      authReducer({}, {
        type: types.LOGOUT_REQUEST,
      }),
    ).toEqual(
      {
        isLogoutRequest: true,
        isLogoutFailed: false,
      },
    );
  });

  it('should handle LOGOUT_FAILED', () => {
    expect(
      authReducer({}, {
        type: types.LOGOUT_FAILED,
      }),
    ).toEqual(
      {
        isLogoutRequest: false,
        isLogoutFailed: true,
      },
    );
  });

  it('should handle REQUEST_CODE', () => {
    expect(
      authReducer({}, {
        type: types.REQUEST_CODE,
      }),
    ).toEqual(
      {
        isCodeRequest: false,
        isCodeRequestFailed: false,
      },
    );
  });

  it('should handle REQUEST_CODE_REQUEST', () => {
    expect(
      authReducer({}, {
        type: types.REQUEST_CODE_REQUEST,
      }),
    ).toEqual(
      {
        isCodeRequest: true,
        isCodeRequestFailed: false,
      },
    );
  });

  it('should handle REQUEST_CODE_FAILED', () => {
    expect(
      authReducer({}, {
        type: types.REQUEST_CODE_FAILED,
      }),
    ).toEqual(
      {
        isCodeRequest: false,
        isCodeRequestFailed: true,
      },
    );
  });

  it('should handle RESET_PASSWORD', () => {
    expect(
      authReducer({}, {
        type: types.RESET_PASSWORD,
      }),
    ).toEqual(
      {
        isResetRequest: false,
        isResetFailed: false,
      },
    );
  });

  it('should handle RESET_PASSWORD_REQUEST', () => {
    expect(
      authReducer({}, {
        type: types.RESET_PASSWORD_REQUEST,
      }),
    ).toEqual(
      {
        isResetRequest: true,
        isResetFailed: false,
      },
    );
  });

  it('should handle RESET_PASSWORD_FAILED', () => {
    expect(
      authReducer({}, {
        type: types.RESET_PASSWORD_FAILED,
      }),
    ).toEqual(
      {
        isResetRequest: false,
        isResetFailed: true,
      },
    );
  });

  it('should handle UPDATE_TOKEN', () => {
    expect(
      authReducer({}, {
        type: types.UPDATE_TOKEN,
      }),
    ).toEqual(
      {
        isTokenRequest: false,
        isTokenFailed: false,
      },
    );
  });

  it('should handle UPDATE_TOKEN_REQUEST', () => {
    expect(
      authReducer({}, {
        type: types.UPDATE_TOKEN_REQUEST,
      }),
    ).toEqual(
      {
        isTokenRequest: true,
        isTokenFailed: false,
      },
    );
  });

  it('should handle UPDATE_TOKEN_FAILED', () => {
    expect(
      authReducer({}, {
        type: types.UPDATE_TOKEN_FAILED,
      }),
    ).toEqual(
      {
        isTokenRequest: false,
        isTokenFailed: true,
      },
    );
  });
});
