import React from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';

function BurgerIngredientsBlock({
  ingredients, type, name, onClick,
}) {
  const handleClick = (e) => {
    onClick(e.currentTarget.id);
  };

  return (
    <li>
      <h2 className={burgerIngredientsStyles.gridTitle}>{name}</h2>
      <div className={burgerIngredientsStyles.grid}>
        { ingredients.filter((item) => item.type === type).map((el) => (
          <div className={burgerIngredientsStyles.item} key={el._id} id={el._id} role="presentation" onClick={handleClick} onKeyDown={handleClick}>
            <Counter count={1} size="default" />
            <img src={el.image} className={burgerIngredientsStyles.image} alt={el.name} />
            <p className={burgerIngredientsStyles.price}>
              <span>{el.price}</span>
              <CurrencyIcon type="primary" />
            </p>
            <p className={burgerIngredientsStyles.text}>{el.name}</p>
          </div>
        ))}
      </div>
    </li>
  );
}

BurgerIngredientsBlock.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredientsBlock;