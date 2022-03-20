/* eslint-disable default-param-last */
import { TIngredient } from '../../types/types';
import { TActions } from '../actions';
import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
} from '../constants';

type TInitialState = {
  ingredients: ReadonlyArray<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFaied: boolean;
}

const initialState: TInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFaied: false,
};

const ingredientsReducer = (state = initialState, action: TActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
        ingredientsFaied: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredients: [],
        ingredientsRequest: false,
        ingredientsFaied: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default ingredientsReducer;
