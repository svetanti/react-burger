import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement, DragIcon, CurrencyIcon, Button, CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorMobile from './burger-constructor-mobile';
import IngredientsContext from '../../contexts/ingredients-context';

function BurgerConstructor({
  onModalOpen, isTablet, onCloseConstructor,
}) {
  const ingredients = useContext(IngredientsContext);
  const bun = ingredients && ingredients.find((item) => item.type === 'bun');
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
              {bun && (
                <ConstructorElement
                  type="top"
                  isLocked
                  text={bun.name}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              )}
            </div>
            <ul className={burgerConstructorStyles.list}>
              {ingredients.filter((item) => item.type === 'main' || item.type === 'sauce').slice(1).map((el) => (
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
              {bun && (
                <ConstructorElement
                  type="bottom"
                  isLocked
                  text={bun.name}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              )}
            </div>
          </>
        )}
      <div className={burgerConstructorStyles.totalWrapper}>
        <p className={burgerConstructorStyles.price}>
          <span>610</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="medium" onClick={onModalOpen}>{isTablet ? 'Заказать' : 'Оформить заказ'}</Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
  isTablet: PropTypes.bool.isRequired,
  onCloseConstructor: PropTypes.func.isRequired,
};

export default BurgerConstructor;
