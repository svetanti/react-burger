import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import socketMiddleware from './middleware';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_CONNECTION_START_USER,
  WS_CONNECTION_SUCCESS_USER,
  WS_CONNECTION_CLOSED_USER,
  WS_CONNECTION_ERROR_USER,
  WS_GET_ORDERS_USER,
} from './actions/ws-actions';
import { WS_FEED_URL, WS_USER_ORDERS_URL } from '../constants/constants';

export type TWsActions = {
  wsInit: typeof WS_CONNECTION_START;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onOrders: typeof WS_GET_ORDERS;
};

export type TWsActionsUser = {
  wsInit: typeof WS_CONNECTION_START_USER;
  onOpen: typeof WS_CONNECTION_SUCCESS_USER;
  onClose: typeof WS_CONNECTION_CLOSED_USER;
  onError: typeof WS_CONNECTION_ERROR_USER;
  onOrders: typeof WS_GET_ORDERS_USER;
};

const wsActions: TWsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onOrders: WS_GET_ORDERS,
};

const wsActionsUser: TWsActionsUser = {
  wsInit: WS_CONNECTION_START_USER,
  onOpen: WS_CONNECTION_SUCCESS_USER,
  onClose: WS_CONNECTION_CLOSED_USER,
  onError: WS_CONNECTION_ERROR_USER,
  onOrders: WS_GET_ORDERS_USER,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    thunk,
    socketMiddleware(WS_FEED_URL, wsActions),
    socketMiddleware(WS_USER_ORDERS_URL, wsActionsUser),
  ],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
