import {
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
  DELETE_ORDER_DATA,
} from '../actions/actions';

const initialState = {
  order: {
    number: 0,
  },
  isOrderRequest: false,
  isOrderFaied: false,
};

const orderReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        isOrderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order,
        isOrderRequest: false,
        isOrderFaied: false,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        order: {
          number: 0,
        },
        isOrderRequest: false,
        isOrderFaied: true,
      };
    }
    case DELETE_ORDER_DATA: {
      return {
        ...state,
        order: {
          number: 0,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default orderReducer;
