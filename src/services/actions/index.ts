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
