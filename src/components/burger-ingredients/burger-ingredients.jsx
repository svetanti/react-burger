import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsBlock from './burger-ingridients-block';

function BurgerIngredients({
  onModalOpen, onOpenConstructor, isTablet,
}) {
  const [current, setCurrent] = React.useState('Булки');
  return (
    <section className={burgerIngredientsStyles.container}>
      <h1 className={burgerIngredientsStyles.title}>Соберите бургер</h1>
      <div className={burgerIngredientsStyles.tabs}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={burgerIngredientsStyles.list}>
        <BurgerIngredientsBlock type="bun" name="Булки" onClick={onModalOpen} />
        <BurgerIngredientsBlock type="sauce" name="Соусы" onClick={onModalOpen} />
        <BurgerIngredientsBlock type="main" name="Начинки" onClick={onModalOpen} />
      </ul>
      {isTablet && (
        <div className={burgerIngredientsStyles.totalWrapper}>
          <p className={burgerIngredientsStyles.price}>
            <span>610</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="medium" onClick={onOpenConstructor}>Оформить заказ</Button>
        </div>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
  onOpenConstructor: PropTypes.func.isRequired,
  isTablet: PropTypes.bool.isRequired,
};

export default BurgerIngredients;
