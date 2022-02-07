import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';

function IngredientPage() {
  const { pathname } = useLocation();
  const id = pathname.replace('/ingredients/', '');
  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);
  const currentIngredient = ingredients.length && ingredients.find((item) => item._id === id);

  return (
    <div className={styles.wrapper}>
      {currentIngredient && (<IngredientDetails ingredient={currentIngredient} />)}
    </div>
  );
}

export default IngredientPage;
