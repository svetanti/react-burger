import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
} from '../actions/actions';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFaied: false,
};

const ingredientsReducer = (state = initialState, action = {}) => {
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
    case GET_INGREDIENTS_ERROR: {
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
