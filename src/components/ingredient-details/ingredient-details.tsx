import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../hooks';
import { TIngredient } from '../../types/types';
import ingredientDetailsStyles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  ingredient?: TIngredient;
};

type TParams = {
  id: string;
};

const IngredientDetails:FC<TIngredientDetailsProps> = () => {
  const { id } = useParams<TParams>();
  const { ingredients } = useSelector((store) => store.ingredientsReducer);
  const ingredient = ingredients.length && ingredients.find((item: TIngredient) => item._id === id);

  return (
    <div className={ingredientDetailsStyles.wrapper}>
      {ingredient
      && (
      <>
        <img
          src={ingredient.image}
          className={ingredientDetailsStyles.img}
          alt={ingredient.name}
        />
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
      </>
      )}
    </div>
  );
};

export default IngredientDetails;
