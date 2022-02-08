import {
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_ERROR,
} from '../actions/actions';

const initialState = {
  order: {
    number: 0,
  },
  orderRequest: false,
  orderFaied: false,
};

const orderReducer = (state = initialState, action = {}) => {
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

export default orderReducer;
