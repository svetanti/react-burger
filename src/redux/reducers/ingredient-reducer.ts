/* eslint-disable default-param-last */
import { TIngredient } from '../../types/types';
import { TActions } from '../actions';
import {
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
} from '../constants';

type TInitialState = {
  ingredient: TIngredient | {}
}

const initialState: TInitialState = {
  ingredient: {},
};

const ingredientReducer = (state = initialState, action: TActions) => {
  switch (action.type) {
    case ADD_INGREDIENT_DATA: {
      return {
        ...state,
        ingredient: action.item,
      };
    }
    case DELETE_INGREDIENT_DATA: {
      return {
        ...state,
        ingredient: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default ingredientReducer;
