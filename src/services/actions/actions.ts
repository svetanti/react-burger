import { TIngredient } from '../../types/types';
import * as api from '../../utils/api';
import {
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  DELETE_INGREDIENT,
  ADD_INGREDIENT,
  MOVE_CONSTRUCTOR_ELEMENT,
  DELETE_ORDER_DATA,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLEAR_CURRENT_BURGER,
} from '../constants';

import { AppDispatch, AppThunk } from '../types';

export interface IAddIngredientData {
  readonly type: typeof ADD_INGREDIENT_DATA;
  readonly item: TIngredient;
}
export interface IDeleteIngredientData {
  readonly type: typeof DELETE_INGREDIENT_DATA;
}
export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly index: number;
}
export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngredient;
}
export interface IMoveConstructorElement {
  readonly type: typeof MOVE_CONSTRUCTOR_ELEMENT;
  readonly payload: Array<TIngredient>;
}
export interface IDeleteOrderData {
  readonly type: typeof DELETE_ORDER_DATA;
}
export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<TIngredient>;
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly number: number
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IClearCurrentBurger {
  readonly type: typeof CLEAR_CURRENT_BURGER;
}

export const addIngredientData = (item: TIngredient): IAddIngredientData => ({
  type: ADD_INGREDIENT_DATA, item,
});
export const deleteIngredientData = (): IDeleteIngredientData => ({ type: DELETE_INGREDIENT_DATA });
export const deleteIngredient = (index: number): IDeleteIngredient => ({
  type: DELETE_INGREDIENT, index,
});
export const addIngredient = (payload: TIngredient): IAddIngredient => ({
  type: ADD_INGREDIENT, payload,
});
export const moveConstructorElement = (payload: Array<TIngredient>): IMoveConstructorElement => ({
  type: MOVE_CONSTRUCTOR_ELEMENT, payload,
});
export const deleteOrderData = (): IDeleteOrderData => ({ type: DELETE_ORDER_DATA });

const getIngredientsRequest = (): IGetIngredientsRequest => ({ type: GET_INGREDIENTS_REQUEST });
const getIngredientsSuccess = (ingredients: Array<TIngredient>): IGetIngredientsSuccess => (
  { type: GET_INGREDIENTS_SUCCESS, ingredients }
);
const getIngredientsFailed = (): IGetIngredientsFailed => ({ type: GET_INGREDIENTS_FAILED });
const getOrderRequest = (): IGetOrderRequest => ({ type: GET_ORDER_REQUEST });
const getOrderSuccess = (number: number): IGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS, number,
});
const getOrderFailed = (): IGetOrderFailed => ({ type: GET_ORDER_FAILED });
const clearCurrentBurger = (): IClearCurrentBurger => ({ type: CLEAR_CURRENT_BURGER });

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest());
  api.getIngredients()
    .then((data) => dispatch(getIngredientsSuccess(data.data)))
    .catch(() => dispatch(getIngredientsFailed()));
};

export const getOrder: AppThunk = (orderData) => (dispatch: AppDispatch) => {
  dispatch(getOrderRequest());
  api.sendOrder(orderData).then((data) => {
    dispatch(getOrderSuccess(data.order));
    dispatch(clearCurrentBurger());
  })
    .catch(() => dispatch(getOrderFailed()));
};
