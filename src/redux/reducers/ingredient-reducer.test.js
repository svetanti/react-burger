import ingredientReducer from './ingredient-reducer';
import * as types from '../constants';

describe('ingredient reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientReducer(undefined, {})).toEqual({
      ingredient: {},
    });
  });

  it('should handle ADD_INGREDIENT_DATA', () => {
    expect(ingredientReducer({}, {
      type: types.ADD_INGREDIENT_DATA,
      item: {
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
      },
    }, {})).toEqual({
      ingredient: {
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
      },
    });
  });

  it('should handle DELETE_INGREDIENT_DATA', () => {
    expect(ingredientReducer({}, {
      type: types.DELETE_INGREDIENT_DATA,
    })).toEqual({
      ingredient: {},
    });
  });
});
