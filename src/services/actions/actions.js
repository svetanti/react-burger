import * as api from '../../utils/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_CONSTRUCTOR_ELEMENT = 'MOVE_CONSTRUCTOR_ELEMENT';
export const ADD_INGREDIENT_DATA = 'ADD_INGREDIENT_DATA';
export const DELETE_INGREDIENT_DATA = 'DELETE_INGREDIENT_DATA';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const getIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  api.getIngredients()
    .then((data) => dispatch({
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: data.data,
    }))
    .catch(() => dispatch({ type: GET_INGREDIENTS_ERROR }));
};

export const getOrder = (orderData) => (dispatch) => {
  dispatch({ type: GET_ORDER_REQUEST });
  api.sendOrder(orderData).then((data) => {
    dispatch({
      type: GET_ORDER_SUCCESS,
      order: data,
    });
  })
    .catch(() => dispatch({ type: GET_ORDER_ERROR }));
};
