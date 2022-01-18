import React, { useContext } from 'react';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientsContext from '../../contexts/ingredients-context';

function BurgerIngredientsBlock({
  type, name, onClick,
}) {
  const ingredients = useContext(IngredientsContext);
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
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredientsBlock;
