/* eslint-disable default-param-last */
import { TActions } from '../actions';
import {
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  DELETE_ORDER_DATA,
} from '../constants';

type TInitialState = {
  number: number | undefined;
  isOrderRequest: boolean;
  isOrderFaied: boolean;
}

const initialState: TInitialState = {
  number: undefined,
  isOrderRequest: false,
  isOrderFaied: false,
};

const orderReducer = (state = initialState, action: TActions) => {
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
        number: action.number,
        isOrderRequest: false,
        isOrderFaied: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        number: undefined,
        isOrderRequest: false,
        isOrderFaied: true,
      };
    }
    case DELETE_ORDER_DATA: {
      return {
        ...state,
        number: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export default orderReducer;
