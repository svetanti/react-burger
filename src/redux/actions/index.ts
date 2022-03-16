import {
  IAddIngredientData,
  IDeleteIngredientData,
  IDeleteIngredient,
  IAddIngredient,
  IMoveConstructorElement,
  IDeleteOrderData,
  IGetIngredientsRequest,
  IGetIngredientsSuccess,
  IGetIngredientsFailed,
  IGetOrderRequest,
  IGetOrderSuccess,
  IGetOrderFailed,
  IClearCurrentBurger,
} from './actions';
import {
  IRegisterUserRequest,
  IRegisterUser,
  IRegisterUserFailed,
  ILoginUserRequest,
  ILoginUser,
  ILoginUserFailed,
  ILogoutRequest,
  ILogout,
  ILogoutFailed,
  IUpdateTokenRequest,
  IUpdateTokenSuccess,
  IUpdateTokenFailed,
  IGetUserRequest,
  IGetUserSuccess,
  IGetUserFailed,
  IUpdateUserRequest,
  IUpdateUserSuccess,
  IUpdateUserFailed,
  IRequestCodeRequest,
  IRequestCodeSuccess,
  IRequestCodeFailed,
  IResetPasswordRequest,
  IResetPasswordSuccess,
  IResetPasswordFailed,
} from './auth-actions';
import {
  IWsConnectionSuccess,
  IWsConnectionError,
  IWsConnectionClosed,
  IWsGetOrders,
  IWsConnectionSuccessUser,
  IWsConnectionErrorUser,
  IWsConnectionClosedUser,
  IWsGetOrdersUser,
  IWsConnectionStart,
  IWsConnectionStartUser,
} from './ws-actions';

export type TActions =
  | IAddIngredientData
  | IDeleteIngredientData
  | IDeleteIngredient
  | IAddIngredient
  | IMoveConstructorElement
  | IDeleteOrderData
  | IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | IClearCurrentBurger
  | IRegisterUserRequest
  | IRegisterUser
  | IRegisterUserFailed
  | ILoginUserRequest
  | ILoginUser
  | ILoginUserFailed
  | ILogoutRequest
  | ILogout
  | ILogoutFailed
  | IUpdateTokenRequest
  | IUpdateTokenSuccess
  | IUpdateTokenFailed
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | IUpdateUserRequest
  | IUpdateUserSuccess
  | IUpdateUserFailed
  | IRequestCodeRequest
  | IRequestCodeSuccess
  | IRequestCodeFailed
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetOrders
  | IWsConnectionStartUser
  | IWsConnectionSuccessUser
  | IWsConnectionErrorUser
  | IWsConnectionClosedUser
  | IWsGetOrdersUser
