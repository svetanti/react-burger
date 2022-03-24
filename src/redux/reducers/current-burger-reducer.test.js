import currentBurgerReducer from './current-burger-reducer';
import * as types from '../constants';

describe('current burger reducer', () => {
  it('should return the initial state', () => {
    expect(currentBurgerReducer(undefined, {})).toEqual(
      {
        currentBurger: [],
      },
    );
  });

  it('should handle ADD_INGREDIENT', () => {
    expect(
      currentBurgerReducer({
        currentBurger: [],
      }, {
        type: types.ADD_INGREDIENT,
        payload: {
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
      }),
    ).toEqual(
      {
        currentBurger: [{
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
      },
    );
  });

  it('should handle DELETE_INGREDIENT', () => {
    expect(
      currentBurgerReducer({
        currentBurger: [{
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
      }, {
        type: types.DELETE_INGREDIENT,
        index: 0,
      }),
    ).toEqual(
      {
        currentBurger: [],
      },
    );
  });

  it('should handle MOVE_CONSTRUCTOR_ELEMENT', () => {
    expect(
      currentBurgerReducer({
        currentBurger: [{
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
        {
          _id: '',
          name: '',
          type: '',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: '',
          image_mobile: '',
          image_large: '',
          __v: 1,
        }],
      }, {
        type: types.MOVE_CONSTRUCTOR_ELEMENT,
        payload: [
          {
            _id: '',
            name: '',
            type: '',
            proteins: 1,
            fat: 1,
            carbohydrates: 1,
            calories: 1,
            price: 1,
            image: '',
            image_mobile: '',
            image_large: '',
            __v: 1,
          },
          {
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
        ],
      }),
    ).toEqual(
      {
        currentBurger: [{
          _id: '',
          name: '',
          type: '',
          proteins: 1,
          fat: 1,
          carbohydrates: 1,
          calories: 1,
          price: 1,
          image: '',
          image_mobile: '',
          image_large: '',
          __v: 1,
        },
        {
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
      },
    );
  });

  it('should handle MOVE_CONSTRUCTOR_ELEMENT', () => {
    expect(
      currentBurgerReducer({
        currentBurger: [{
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
      }, {
        type: types.CLEAR_CURRENT_BURGER,
      }),
    ).toEqual(
      {
        currentBurger: [],
      },
    );
  });
});
