import { AnyAction, MiddlewareAPI } from 'redux';
import { getCookie } from '../../utils/utils';
import { TWsActions, TWsActionsUser } from '../store';

const socketMiddleware = (wsUrl: string, wsActions: TWsActions | TWsActionsUser) => (
  store: MiddlewareAPI,
) => {
  let socket: WebSocket | null = null;

  return (next: any) => (action: AnyAction) => {
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
        dispatch({ type: onOrders, payload: parsedData.orders });
      };

      socket.onclose = (event) => {
        dispatch({ type: onClose, payload: event });
      };
    }

    next(action);
  };
};

export default socketMiddleware;
