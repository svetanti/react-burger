import { TOrder } from '../../types/types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
  WS_CONNECTION_START_USER,
  WS_CONNECTION_SUCCESS_USER,
  WS_CONNECTION_ERROR_USER,
  WS_CONNECTION_CLOSED_USER,
  WS_GET_ORDERS_USER,
} from '../constants';

export interface IOrders {
    readonly orders: Array<TOrder>;
    readonly total: number;
    readonly totalToday: number;
}

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetOrders {
    readonly type: typeof WS_GET_ORDERS;
    readonly payload: IOrders
}

export interface IWsConnectionStartUser {
    readonly type: typeof WS_CONNECTION_START_USER;
}
export interface IWsConnectionSuccessUser {
    readonly type: typeof WS_CONNECTION_SUCCESS_USER;
}
export interface IWsConnectionErrorUser {
    readonly type: typeof WS_CONNECTION_ERROR_USER;
}
export interface IWsConnectionClosedUser {
    readonly type: typeof WS_CONNECTION_CLOSED_USER;
}
export interface IWsGetOrdersUser {
    readonly type: typeof WS_GET_ORDERS_USER;
    readonly payload: IOrders
}

export const wsConnectionStart = (): IWsConnectionStart => ({ type: WS_CONNECTION_START });
export const wsConnectionSuccess = (): IWsConnectionSuccess => ({ type: WS_CONNECTION_SUCCESS });
export const wsConnectionError = (): IWsConnectionError => ({ type: WS_CONNECTION_ERROR });
export const wsConnectionClosed = (): IWsConnectionClosed => ({ type: WS_CONNECTION_CLOSED });
export const wsGetOrders = (payload: IOrders): IWsGetOrders => (
  { type: WS_GET_ORDERS, payload });

export const wsConnectionStartUser = (): IWsConnectionStartUser => (
  { type: WS_CONNECTION_START_USER });
export const wsConnectionSuccessUser = (): IWsConnectionSuccessUser => (
  { type: WS_CONNECTION_SUCCESS_USER });
export const wsConnectionErrorUser = (): IWsConnectionErrorUser => (
  { type: WS_CONNECTION_ERROR_USER });
export const wsConnectionClosedUser = (): IWsConnectionClosedUser => (
  { type: WS_CONNECTION_CLOSED_USER });
export const wsGetOrdersUser = (payload: IOrders): IWsGetOrdersUser => (
  { type: WS_GET_ORDERS_USER, payload });
