import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';

function BurgerIngredient({ el, onClick }) {
  const [, ref] = useDrag({
    type: 'ingredient',
    item: el,
  });
  const { currentBurger } = useSelector((store) => store.currentBurgerReducer);
  const counter = currentBurger.filter((item) => item._id === el._id)?.length;
  return (
    <div
      className={burgerIngredientsStyles.item}
      id={el._id}
      role="presentation"
      onClick={onClick}
      onKeyDown={onClick}
      ref={ref}
      draggable
    >
      <Counter count={counter} size="default" />
      <img src={el.image} className={burgerIngredientsStyles.image} alt={el.name} />
      <p className={burgerIngredientsStyles.price}>
        <span>{el.price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={burgerIngredientsStyles.text}>{el.name}</p>
    </div>
  );
}

BurgerIngredient.propTypes = {
  el: PropTypes.oneOfType([PropTypes.object, PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }),
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredient;
