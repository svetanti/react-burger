import {
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
} from '../actions/actions';

const initialState = {
  ingredient: {},
};

const ingredientReducer = (state = initialState, action = {}) => {
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
