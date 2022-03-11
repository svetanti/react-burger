import React, { forwardRef } from 'react';
import { useSelector } from '../../hooks';
import burgerIngredientsStyles from '../burger-ingredients/burger-ingredients.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { TIngredient } from '../../types/types';

type TBurgerIngredientsBlockProps = {
  type: string;
  name: string;
  onClick: (el: TIngredient) => void;
};

const BurgerIngredientsBlock = forwardRef<
  HTMLLIElement, TBurgerIngredientsBlockProps>(({
    type, name, onClick,
  }, ref) => {
    const handleClick = (el: TIngredient) => {
      onClick(el);
    };

    const { ingredients } = useSelector((store) => store.ingredientsReducer);

    return (
      <li ref={ref}>
        <h2 className={burgerIngredientsStyles.gridTitle}>{name}</h2>
        <div className={burgerIngredientsStyles.grid}>
          { ingredients.filter((item: TIngredient) => item.type === type).map((el: TIngredient) => (
            <BurgerIngredient el={el} onClick={() => handleClick(el)} key={el._id} />
          ))}
        </div>
      </li>
    );
  });

export default BurgerIngredientsBlock;
