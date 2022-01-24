import React from 'react';
import { useSelector } from 'react-redux';
import ingredientDetailsStyles from './ingredient-details.module.css';

function IngredientDetails() {
  const { ingredient } = useSelector((store) => store.ingredientsReducer);

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

export default IngredientDetails;
