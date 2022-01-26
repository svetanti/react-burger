import * as api from '../../utils/api';

export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_CONSTRUCTOR_ELEMENT = 'MOVE_CONSTRUCTOR_ELEMENT';
export const ADD_INGREDIENT_DATA = 'ADD_INGREDIENT_DATA';
export const DELETE_INGREDIENT_DATA = 'DELETE_INGREDIENT_DATA';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';

export const getIngredients = () => (dispatch) => {
  api.getIngredients().then((data) => {
    dispatch({
      type: GET_INGREDIENTS_SUCCESS,
      ingredients: data,
    });
  });
};

export const getOrder = (orderData) => (dispatch) => {
  api.sendOrder(orderData).then((data) => {
    dispatch({
      type: GET_ORDER_NUMBER,
      order: data,
    });
  });
};
