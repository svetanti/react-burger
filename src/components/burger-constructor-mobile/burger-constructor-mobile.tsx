import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ConstructorElementMobile from '../constructor-element-mobile/constructor-element-mobile';
import burgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { TRootState } from '../../services/reducers';
import { TIngredient } from '../../types/types';

const BurgerConstructorMobile:FC = () => {
  const { currentBurger } = useSelector((store: TRootState) => store.currentBurgerReducer);
  const bun = currentBurger.find((item: TIngredient) => item.type === 'bun');

  return (
    <>
      {bun && (
      <ConstructorElementMobile
        text={bun.name}
        price={bun.price}
        thumbnail={bun.image}
      />
      )}
      <ul className={burgerConstructorStyles.list}>
        {currentBurger.filter((item: TIngredient) => item.type !== 'bun').map((el: TIngredient) => (
          <li className={burgerConstructorStyles.ingredient} key={`${el._id}_${uuidv4()}`}>
            <ConstructorElementMobile
              text={el.name}
              price={el.price}
              thumbnail={el.image}
            />
          </li>
        ))}
      </ul>
      {bun && (
      <ConstructorElementMobile
        text={bun.name}
        price={bun.price}
        thumbnail={bun.image}
      />
      )}
    </>
  );
};

export default BurgerConstructorMobile;
