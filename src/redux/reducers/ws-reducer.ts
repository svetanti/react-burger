/* eslint-disable default-param-last */
import { TOrder } from '../../types/types';
import { TActions } from '../actions';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_SUCCESS_USER,
  WS_CONNECTION_ERROR_USER,
  WS_CONNECTION_CLOSED_USER,
  WS_GET_ORDERS_USER,
} from '../actions/ws-actions';

type TInitialState = {
  wsConnected: boolean;
  orders: Array<TOrder>,
  userOrders: Array<TOrder>
};

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  userOrders: [],
};
const wsReducer = (state = initialState, action: TActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case WS_CONNECTION_SUCCESS_USER:
      return {
        ...state,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR_USER:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED_USER:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_ORDERS_USER:
      return {
        ...state,
        userOrders: action.payload,
      };
    default:
      return state;
  }
};

export default wsReducer;
