import orderReducer from './order-reducer';
import * as types from '../constants';

describe('orders reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual({
      order: null,
      isOrderRequest: false,
      isOrderFaied: false,
    });
  });

  it('should handle GET_ORDER_REQUEST', () => {
    expect(orderReducer({}, {
      type: types.GET_ORDER_REQUEST,
    })).toEqual({
      isOrderRequest: true,
    });
  });

  it('should handle GET_ORDER_SUCCESS', () => {
    expect(orderReducer({}, {
      type: types.GET_ORDER_SUCCESS,
      order: {
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
      },
    })).toEqual({
      order: {
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
      },
      isOrderRequest: false,
      isOrderFaied: false,
    });
  });

  it('should handle GET_ORDER_FAILED', () => {
    expect(orderReducer({}, {
      type: types.GET_ORDER_FAILED,
    })).toEqual({
      order: null,
      isOrderRequest: false,
      isOrderFaied: true,
    });
  });

  it('should handle DELETE_ORDER_DATA', () => {
    expect(orderReducer({}, {
      type: types.DELETE_ORDER_DATA,
    })).toEqual({
      order: null,
    });
  });
});
