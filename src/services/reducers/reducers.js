import {
  GET_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  MOVE_CONSTRUCTOR_ELEMENT,
  TOGGLE_MODAL,
  GET_ORDER_NUMBER,
} from '../actions/actions';

const initialIngredientsState = {
  ingredients: [],
};

const initialBurgerState = {
  currentBurger: [],
};

const initialIngredientState = {
  ingredient: {},
};

const initialOrderState = {
  order: {
    number: 0,
  },
};

const initialModalState = {
  isModalOpened: false,
};

export const ingredientsReducer = (state = initialIngredientsState, action = {}) => {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
      };
    }
    default: {
      return state;
    }
  }
};

export const currentBurgerReducer = (state = initialBurgerState, action = {}) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        currentBurger: [...state.currentBurger, action.item],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        currentBurger: [...state.currentBurger].filter((item, index) => index !== action.index),
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

export const ingredientReducer = (state = initialIngredientState, action = {}) => {
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

export const orderReducer = (state = initialOrderState, action = {}) => {
  switch (action.type) {
    case GET_ORDER_NUMBER: {
      console.log(action.order);
      return {
        ...state,
        order: action.order,
      };
    }
    default: {
      return state;
    }
  }
};

export const modalReducer = (state = initialModalState, action = {}) => {
  switch (action.type) {
    case (TOGGLE_MODAL): {
      return { ...state, isModalOpened: !state.isModalOpened };
    }
    default: {
      return state;
    }
  }
};
