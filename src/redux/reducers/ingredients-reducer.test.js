import ingredientsReducer from './ingredients-reducer';
import * as types from '../constants';

describe('ingredients reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual({
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFaied: false,
    });
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(ingredientsReducer({}, {
      type: types.GET_INGREDIENTS_REQUEST,
    })).toEqual({
      ingredientsRequest: true,
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredientsReducer({}, {
      type: types.GET_INGREDIENTS_SUCCESS,
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
    })).toEqual({
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
      ingredientsRequest: false,
      ingredientsFaied: false,
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(ingredientsReducer({}, {
      type: types.GET_INGREDIENTS_FAILED,
    })).toEqual({
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFaied: true,
    });
  });
});
