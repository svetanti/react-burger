import {
  GET_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  MOVE_CONSTRUCTOR_ELEMENT,
} from '../actions/actions';

const initialState = {
  ingredients: [],
  currentBurger: [],
  ingredient: {},
  order: {},
};

export const ingredientsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        currentBurger: [...state.currentBurger, action.item],
      };
    }
    case DELETE_INGREDIENT: {
      console.log(action.index);
      return {
        ...state,
        currentBurger: [...state.currentBurger].filter((item, index) => index !== action.index),
      };
    }
    case ADD_INGREDIENT_DATA: {
      return {
        ...state,
        ingredient: [...state.ingredients].find((item) => item._id === action.id),
      };
    }
    case DELETE_INGREDIENT_DATA: {
      return {
        ...state,
        ingredient: {},
      };
    }
    case MOVE_CONSTRUCTOR_ELEMENT: {
      const constructorElements = [...state.currentBurger].filter((item) => item.type !== 'bun');
      const bun = [...state.currentBurger].find((item) => item.type === 'bun');
      const dragElement = constructorElements.splice(action.payload.dragIndex, 1)[0];
      constructorElements.splice(action.payload.hoverIndex, 0, dragElement);
      return bun
        ? ({
          ...state,
          currentBurger: [bun, ...constructorElements],
        })
        : ({
          ...state,
          currentBurger: constructorElements,
        });
    }
    default: {
      return state;
    }
  }
};

export const modalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
