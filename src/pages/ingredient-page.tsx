import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../hooks';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { TIngredient } from '../types/types';
import styles from './ingredient-page.module.css';

type TParams = {
  id: string;
};

const IngredientPage = () => {
  const { id } = useParams<TParams>();
  const ingredients = useSelector((store) => store.ingredientsReducer.ingredients);
  const currentIngredient = useMemo(() => ingredients
    .find((item: TIngredient) => item._id === id), [ingredients]);

  return (
    <div className={styles.wrapper}>
      {currentIngredient && (<IngredientDetails ingredient={currentIngredient} />)}
    </div>
  );
};

export default IngredientPage;
