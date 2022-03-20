import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks';
import styles from '../burger-ingredients/burger-ingredients.module.css';
import { TIngredient } from '../../types/types';

type TBurgerIngredientProps = {
  el: TIngredient;
  onClick: () => void;
};

const BurgerIngredient:FC<TBurgerIngredientProps> = ({ el, onClick }) => {
  const location = useLocation();
  const ingredientId = el._id;

  const [, ref] = useDrag({
    type: 'ingredient',
    item: el,
  });
  const { currentBurger } = useSelector((store) => store.currentBurgerReducer);
  const counter = currentBurger.filter((item: TIngredient) => item._id === el._id)?.length;
  return (
    <Link
      key={ingredientId}
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <div
        className={styles.item}
        id={el._id}
        role="presentation"
        onClick={onClick}
        onKeyDown={onClick}
        ref={ref}
        draggable
      >
        <Counter count={counter} size="default" />
        <img src={el.image} className={styles.image} alt={el.name} />
        <p className={styles.price}>
          <span>{el.price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={styles.text}>{el.name}</p>
      </div>
    </Link>
  );
};

export default BurgerIngredient;
