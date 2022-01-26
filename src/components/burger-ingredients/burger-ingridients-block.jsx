import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import BurgerIngredient from './burger-ingredient';

const BurgerIngredientsBlock = forwardRef(({
  type, name, onClick,
}, ref) => {
  const handleClick = (el) => {
    onClick(el);
  };

  const { ingredients } = useSelector((store) => store.ingredientsReducer);

  return (
    <li ref={ref}>
      <h2 className={burgerIngredientsStyles.gridTitle}>{name}</h2>
      <div className={burgerIngredientsStyles.grid}>
        { ingredients.filter((item) => item.type === type).map((el) => (
          <BurgerIngredient el={el} onClick={() => handleClick(el)} key={el._id} />
        ))}
      </div>
    </li>
  );
});

BurgerIngredientsBlock.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredientsBlock;
