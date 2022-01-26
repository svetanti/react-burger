import {
  GET_INGREDIENTS_SUCCESS,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  MOVE_CONSTRUCTOR_ELEMENT,
  TOGGLE_MODAL,
  GET_ORDER_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
} from '../actions/actions';

const initialIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFaied: false,
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
  orderRequest: false,
  orderFaied: false,
};

const initialModalState = {
  isModalOpened: false,
};

export const ingredientsReducer = (state = initialIngredientsState, action = {}) => {
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
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderFaied: false,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        order: {
          number: 0,
        },
        orderRequest: false,
        orderFaied: true,
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
