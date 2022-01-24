import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredient from './burger-ingredient';

function BurgerIngredientsBlock({
  type, name, onClick,
}) {
  const handleClick = (e) => {
    onClick(e.currentTarget.id);
  };

  const { ingredients } = useSelector((store) => store.ingredientsReducer);

  return (
    <li>
      <h2 className={burgerIngredientsStyles.gridTitle}>{name}</h2>
      <div className={burgerIngredientsStyles.grid}>
        { ingredients.filter((item) => item.type === type).map((el) => (
          <BurgerIngredient el={el} onClick={handleClick} key={el._id} />
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
