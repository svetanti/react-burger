import wsReducer from './ws-reducer';
import * as types from '../constants';

describe('ws-recucer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual({
      wsConnected: false,
      orders: [],
      total: 0,
      totalToday: 0,
      userOrders: [],
    });
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    expect(wsReducer({}, {
      type: types.WS_CONNECTION_SUCCESS,
    })).toEqual({
      wsConnected: true,
    });
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    expect(wsReducer({}, {
      type: types.WS_CONNECTION_ERROR,
    })).toEqual({
      wsConnected: false,
    });
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    expect(wsReducer({}, {
      type: types.WS_CONNECTION_CLOSED,
    })).toEqual({
      wsConnected: false,
    });
  });

  it('should handle WS_GET_ORDERS', () => {
    expect(wsReducer({}, {
      type: types.WS_GET_ORDERS,
      payload: {
        orders: [{
          createdAt: '',
          ingredients: [{
            _id: '',
            name: '',
            type: '',
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
            calories: 0,
            price: 0,
            image: '',
            image_mobile: '',
            image_large: '',
            __v: 0,
          }],
          name: '',
          number: 0,
          owner: {
            name: '',
            email: '',
            createdAt: '',
          },
          price: 0,
          status: '',
          updatedAt: '',
          _id: '',
        }],
        total: 1,
        totalToday: 1,
      },
    })).toEqual({
      orders: [{
        createdAt: '',
        ingredients: [{
          _id: '',
          name: '',
          type: '',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: '',
          image_mobile: '',
          image_large: '',
          __v: 0,
        }],
        name: '',
        number: 0,
        owner: {
          name: '',
          email: '',
          createdAt: '',
        },
        price: 0,
        status: '',
        updatedAt: '',
        _id: '',
      }],
      total: 1,
      totalToday: 1,
    });
  });

  it('should hanlde WS_CONNECTION_SUCCESS_USER', () => {
    expect(wsReducer({}, {
      type: types.WS_CONNECTION_SUCCESS_USER,
    })).toEqual({
      wsConnected: true,
    });
  });

  it('should hanlde WS_CONNECTION_ERROR_USER', () => {
    expect(wsReducer({}, {
      type: types.WS_CONNECTION_ERROR_USER,
    })).toEqual({
      wsConnected: false,
    });
  });

  it('should hanlde WS_CONNECTION_CLOSED_USER', () => {
    expect(wsReducer({}, {
      type: types.WS_CONNECTION_CLOSED_USER,
    })).toEqual({
      wsConnected: false,
    });
  });

  it('should handle WS_GET_ORDERS_USER', () => {
    expect(wsReducer({}, {
      type: types.WS_GET_ORDERS_USER,
      payload: {
        orders: [{
          createdAt: '',
          ingredients: [{
            _id: '',
            name: '',
            type: '',
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
            calories: 0,
            price: 0,
            image: '',
            image_mobile: '',
            image_large: '',
            __v: 0,
          }],
          name: '',
          number: 0,
          owner: {
            name: '',
            email: '',
            createdAt: '',
          },
          price: 0,
          status: '',
          updatedAt: '',
          _id: '',
        }],
      },
    })).toEqual({
      userOrders: [{
        createdAt: '',
        ingredients: [{
          _id: '',
          name: '',
          type: '',
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: '',
          image_mobile: '',
          image_large: '',
          __v: 0,
        }],
        name: '',
        number: 0,
        owner: {
          name: '',
          email: '',
          createdAt: '',
        },
        price: 0,
        status: '',
        updatedAt: '',
        _id: '',
      }],
    });
  });
});
