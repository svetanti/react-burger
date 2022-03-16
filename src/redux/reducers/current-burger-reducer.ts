/* eslint-disable default-param-last */
import { TIngredient } from '../../types/types';
import { TActions } from '../actions';
import {
  ADD_INGREDIENT,
  CLEAR_CURRENT_BURGER,
  DELETE_INGREDIENT,
  MOVE_CONSTRUCTOR_ELEMENT,
} from '../constants';

type TInitialState = {
  currentBurger: ReadonlyArray<TIngredient>
}

const initialState: TInitialState = {
  currentBurger: [],
};

const currentBurgerReducer = (state = initialState, action: TActions) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        currentBurger: [...state.currentBurger, action.payload],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        currentBurger: [...state.currentBurger].filter((item, index) => index !== action.index),
      };
    }
    case MOVE_CONSTRUCTOR_ELEMENT: {
      return ({
        ...state,
        currentBurger: action.payload,
      });
    }
    case CLEAR_CURRENT_BURGER: {
      return ({
        ...state,
        currentBurger: [],
      });
    }
    default: {
      return state;
    }
  }
};

export default currentBurgerReducer;
