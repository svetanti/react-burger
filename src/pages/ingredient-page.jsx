import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';

function IngredientPage() {
  const { id } = useParams();
  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);
  const currentIngredient = useMemo(() => ingredients
    .find((item) => item._id === id), [ingredients]);

  return (
    <div className={styles.wrapper}>
      {currentIngredient && (<IngredientDetails ingredient={currentIngredient} />)}
    </div>
  );
}

export default IngredientPage;
