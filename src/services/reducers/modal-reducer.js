import {
  TOGGLE_MODAL,
} from '../actions/actions';

const initialState = {
  isModalOpened: false,
};

const modalReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case (TOGGLE_MODAL): {
      return { ...state, isModalOpened: !state.isModalOpened };
    }
    default: {
      return state;
    }
  }
};

export default modalReducer;
