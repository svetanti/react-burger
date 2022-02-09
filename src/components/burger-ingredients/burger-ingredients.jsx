import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Tab, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsBlock from './burger-ingridients-block';

function BurgerIngredients({
  onOpenConstructor, isTablet, onIngredientAdd, onOpenIngredientDetails,
}) {
  const { currentBurger } = useSelector((store) => store.currentBurgerReducer);
  const totalPrice = currentBurger.length
    ? currentBurger.reduce((prev, cur) => (cur.type !== 'bun' ? prev + cur.price : prev + cur.price * 2), 0)
    : 0;

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const [current, setCurrent] = React.useState('bun');

  const handleTabClick = (value) => {
    setCurrent(value);
    switch (value) {
      case 'bun': {
        bunRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
        break;
      }
      case 'sauce': {
        sauceRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
        break;
      }
      case 'main': {
        mainRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
        break;
      }
      default: {
        bunRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  };

  const handleTabChange = (e) => {
    const container = e.target;
    const containerTop = container.getBoundingClientRect().top;
    const bunTop = bunRef.current.getBoundingClientRect().top;
    const sauceTop = sauceRef.current.getBoundingClientRect().top;
    const mainTop = mainRef.current.getBoundingClientRect().top;
    const offset = [
      { name: 'bun', value: Math.abs(containerTop - bunTop) },
      { name: 'sauce', value: Math.abs(containerTop - sauceTop) },
      { name: 'main', value: Math.abs(containerTop - mainTop) },
    ];
    const closest = offset.sort((a, b) => a.value - b.value)[0].name;
    if (current !== closest) {
      setCurrent(closest);
    }
  };

  return (
    <section className={burgerIngredientsStyles.container}>
      <h1 className={burgerIngredientsStyles.title}>Соберите бургер</h1>
      <div className={burgerIngredientsStyles.tabs}>
        <Tab value="bun" active={current === 'bun'} onClick={handleTabClick}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={handleTabClick}>Начинки</Tab>
      </div>
      <ul className={burgerIngredientsStyles.list} onScroll={handleTabChange}>
        <BurgerIngredientsBlock type="bun" name="Булки" onClick={isTablet ? onIngredientAdd : onOpenIngredientDetails} ref={bunRef} />
        <BurgerIngredientsBlock type="sauce" name="Соусы" onClick={isTablet ? onIngredientAdd : onOpenIngredientDetails} ref={sauceRef} />
        <BurgerIngredientsBlock type="main" name="Начинки" onClick={isTablet ? onIngredientAdd : onOpenIngredientDetails} ref={mainRef} />
      </ul>
      {isTablet && (
        <div className={burgerIngredientsStyles.totalWrapper}>
          <p className={burgerIngredientsStyles.price}>
            <span>{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button type="primary" size="medium" onClick={onOpenConstructor}>Оформить заказ</Button>
        </div>
      )}
    </section>
  );
}

BurgerIngredients.propTypes = {
  onOpenConstructor: PropTypes.func.isRequired,
  isTablet: PropTypes.bool.isRequired,
  onIngredientAdd: PropTypes.func.isRequired,
  onOpenIngredientDetails: PropTypes.func.isRequired,
};

export default BurgerIngredients;
