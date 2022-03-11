import React, { FC, useRef } from 'react';
import { Tab, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredientsBlock from '../burger-ingridients-block/burger-ingridients-block';
import { TIngredient } from '../../types/types';

type TBurgerIngredients = {
  onOpenConstructor: () => void;
  isTablet: boolean;
  onIngredientAdd: (el: TIngredient) => void;
  onOpenIngredientDetails:(el: TIngredient) => void;
};

const BurgerIngredients:FC<TBurgerIngredients> = ({
  onOpenConstructor, isTablet, onIngredientAdd, onOpenIngredientDetails,
}) => {
  const { currentBurger } = useSelector((store) => store.currentBurgerReducer);
  const totalPrice = currentBurger.length
    ? currentBurger.reduce((prev: number, cur: TIngredient) => (cur.type !== 'bun' ? prev + cur.price : prev + cur.price * 2), 0)
    : 0;

  const bunRef = useRef<HTMLLIElement>(null);
  const sauceRef = useRef<HTMLLIElement>(null);
  const mainRef = useRef<HTMLLIElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);

  const [current, setCurrent] = React.useState('bun');

  const handleTabClick = (value: string) => {
    setCurrent(value);
    switch (value) {
      case 'bun': {
        bunRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        break;
      }
      case 'sauce': {
        sauceRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        break;
      }
      case 'main': {
        mainRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        break;
      }
      default: {
        bunRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }
  };

  const handleTabChange = () => {
    const container = scrollRef.current;
    const containerTop = container?.getBoundingClientRect().top as number;
    const bunTop = bunRef.current?.getBoundingClientRect().top as number;
    const sauceTop = sauceRef.current?.getBoundingClientRect().top as number;
    const mainTop = mainRef.current?.getBoundingClientRect().top as number;
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
      <ul className={burgerIngredientsStyles.list} ref={scrollRef} onScroll={handleTabChange}>
        <BurgerIngredientsBlock
          type="bun"
          name="Булки"
          onClick={isTablet ? onIngredientAdd : onOpenIngredientDetails}
          ref={bunRef}
        />
        <BurgerIngredientsBlock
          type="sauce"
          name="Соусы"
          onClick={isTablet ? onIngredientAdd : onOpenIngredientDetails}
          ref={sauceRef}
        />
        <BurgerIngredientsBlock
          type="main"
          name="Начинки"
          onClick={isTablet ? onIngredientAdd : onOpenIngredientDetails}
          ref={mainRef}
        />
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
};

export default BurgerIngredients;
