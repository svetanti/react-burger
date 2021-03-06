import { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from '../../utils/utils';
import { TWsActions, TWsActionsUser } from '../store';
import { AppDispatch, TRootState } from '../types';

const socketMiddleware = (wsUrl: string, wsActions: TWsActions | TWsActionsUser): Middleware => (
  store: MiddlewareAPI<AppDispatch, TRootState>,
) => {
  let socket: WebSocket | null = null;

  return (next) => (action) => {
    const { dispatch, getState } = store;
    const { isAuth } = getState().authReducer;
    const token = isAuth
      ? `?token=${getCookie('token')?.replace('Bearer ', '')}`
      : '';
    const { type } = action;
    const {
      wsInit, onOpen, onClose, onError, onOrders,
    } = wsActions;
    if (type === wsInit) {
      socket = new WebSocket(`${wsUrl}${token}`);
    }
    if (socket) {
      socket.onopen = (event) => {
        dispatch({ type: onOpen, payload: event });
      };

      socket.onerror = (event) => {
        dispatch({ type: onError, payload: event });
      };

      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        dispatch({ type: onOrders, payload: parsedData });
      };

      socket.onclose = (event) => {
        dispatch({ type: onClose, payload: event });
      };
    }

    next(action);
  };
};

export default socketMiddleware;
