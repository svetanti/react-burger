/* eslint-disable default-param-last */
import { TOrder } from '../../types/types';
import { TActions } from '../actions';
import {
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  DELETE_ORDER_DATA,
} from '../constants';

type TInitialState = {
  order: TOrder | null
  isOrderRequest: boolean;
  isOrderFaied: boolean;
}

const initialState: TInitialState = {
  order: null,
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
        order: action.order,
        isOrderRequest: false,
        isOrderFaied: false,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        order: null,
        isOrderRequest: false,
        isOrderFaied: true,
      };
    }
    case DELETE_ORDER_DATA: {
      return {
        ...state,
        order: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default orderReducer;
