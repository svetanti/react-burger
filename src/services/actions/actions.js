import * as api from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_CONSTRUCTOR_ELEMENT = 'MOVE_CONSTRUCTOR_ELEMENT';
export const CLEAR_CURRENT_BURGER = 'CLEAR_CURRENT_BURGER';
export const ADD_INGREDIENT_DATA = 'ADD_INGREDIENT_DATA';
export const DELETE_INGREDIENT_DATA = 'DELETE_INGREDIENT_DATA';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const DELETE_ORDER_DATA = 'DELETE_ORDER_DATA';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const RESET_ITEM_TO_VIEW = 'RESET_ITEM_TO_VIEW';

export const addIngredientData = (item) => ({ type: ADD_INGREDIENT_DATA, item });
export const deleteIngredientData = () => ({ type: DELETE_INGREDIENT_DATA });
export const deleteIngredient = (index) => ({ type: DELETE_INGREDIENT, index });
export const addIngredient = (payload) => ({ type: ADD_INGREDIENT, payload });
export const moveConstructorElement = (payload) => ({ type: MOVE_CONSTRUCTOR_ELEMENT, payload });
export const deleteOrderData = () => ({ type: DELETE_ORDER_DATA });

const getIngredientsRequest = () => ({ type: GET_INGREDIENTS_REQUEST });
const getIngredientsSuccess = (ingredients) => (
  { type: GET_INGREDIENTS_SUCCESS, ingredients }
);
const getIngredientsError = () => ({ type: GET_INGREDIENTS_ERROR });
const getOrderRequest = () => ({ type: GET_ORDER_REQUEST });
const getOrderSuccess = (order) => ({ type: GET_ORDER_SUCCESS, order });
const getOrderError = () => ({ type: GET_ORDER_ERROR });
const clearCurrentBurger = () => ({ type: CLEAR_CURRENT_BURGER });

export const getIngredients = () => (dispatch) => {
  dispatch(getIngredientsRequest());
  api.getIngredients()
    .then((data) => dispatch(getIngredientsSuccess(data.data)))
    .catch(() => dispatch(getIngredientsError()));
};

export const getOrder = (orderData) => (dispatch) => {
  dispatch(getOrderRequest());
  api.sendOrder(orderData).then((data) => {
    dispatch(getOrderSuccess(data));
    dispatch(clearCurrentBurger());
  })
    .catch(() => dispatch(getOrderError()));
};
