import React from 'react';
import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredient-details.module.css';

function IngredientDetails({ ingredient }) {
  return (
    <div className={ingredientDetailsStyles.wrapper}>
      <img src={ingredient.image} className={ingredientDetailsStyles.img} alt={ingredient.name} />
      <h2 className={ingredientDetailsStyles.title}>{ingredient.name}</h2>
      <ul className={ingredientDetailsStyles.grid}>
        <li className={ingredientDetailsStyles.item}>
          <span>Калории,ккал</span>
          <span className={ingredientDetailsStyles.digit}>{ingredient.calories}</span>
        </li>
        <li className={ingredientDetailsStyles.item}>
          <span>Белки, г</span>
          <span className={ingredientDetailsStyles.digit}>{ingredient.proteins}</span>
        </li>
        <li className={ingredientDetailsStyles.item}>
          <span>Жиры, г</span>
          <span className={ingredientDetailsStyles.digit}>{ingredient.fat}</span>
        </li>
        <li className={ingredientDetailsStyles.item}>
          <span>Углеводы, г</span>
          <span className={ingredientDetailsStyles.digit}>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.oneOfType([PropTypes.object, PropTypes.shape({
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
};

export default IngredientDetails;
