import React, { useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement, DragIcon, CurrencyIcon, Button, CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorMobile from './burger-constructor-mobile';
import IngredientsContext from '../../contexts/ingredients-context';

const initialConstructorState = {
  bun: {},
  burgerIngredients: [],
  totalPrice: 0,
};

function BurgerConstructor({
  onOrder, isTablet, onCloseConstructor,
}) {
  const ingredients = useContext(IngredientsContext);

  function reducer(state, action) {
    const bun = ingredients && ingredients.find((item) => item.type === 'bun');
    const burgerIngredients = ingredients && ingredients
      .filter((item) => item.type !== 'bun')
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    const totalPrice = state.burgerIngredients.length ? state.burgerIngredients
      .reduce((prev, current) => prev + current.price, 0) + state.bun.price * 2
      : 0;
    switch (action.type) {
      case 'initiate':
        return { ...state, burgerIngredients, bun };
      case 'count':
        return { ...state, totalPrice };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [
    constructorState,
    constructorStateDispatcher,
  ] = useReducer(reducer, initialConstructorState);

  useEffect(() => {
    constructorStateDispatcher({ type: 'initiate' });
    constructorStateDispatcher({ type: 'count' });
  }, [ingredients]);

  const handleOrder = () => {
    const orderData = [constructorState.bun, ...constructorState.burgerIngredients]
      .map((item) => item._id);
    onOrder(orderData);
  };

  return (
    <section className={burgerConstructorStyles.container}>
      { isTablet
        ? (
          <>
            <div className={burgerConstructorStyles.mobilePanel}>
              <span>Заказ</span>
              <CloseIcon onClick={onCloseConstructor} />
            </div>
            <BurgerConstructorMobile ingredients={ingredients} />
          </>
        )
        : (
          <>
            <div className={burgerConstructorStyles.ingridientWrapper}>
              {constructorState.bun && (
                <ConstructorElement
                  type="top"
                  isLocked
                  text={constructorState.bun.name}
                  price={constructorState.bun.price}
                  thumbnail={constructorState.bun.image}
                />
              )}
            </div>
            <ul className={burgerConstructorStyles.list}>
              {constructorState.burgerIngredients.map((el) => (
                <li className={burgerConstructorStyles.ingredient} key={el.id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    isLocked={false}
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                  />
                </li>
              ))}
            </ul>
            <div className={burgerConstructorStyles.ingridientWrapper}>
              {constructorState.bun && (
                <ConstructorElement
                  type="bottom"
                  isLocked
                  text={constructorState.bun.name}
                  price={constructorState.bun.price}
                  thumbnail={constructorState.bun.image}
                />
              )}
            </div>
          </>
        )}
      <div className={burgerConstructorStyles.totalWrapper}>
        <p className={burgerConstructorStyles.price}>
          <span>{constructorState.totalPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="medium" onClick={handleOrder}>{isTablet ? 'Заказать' : 'Оформить заказ'}</Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onOrder: PropTypes.func.isRequired,
  isTablet: PropTypes.bool.isRequired,
  onCloseConstructor: PropTypes.func.isRequired,
};

export default BurgerConstructor;
