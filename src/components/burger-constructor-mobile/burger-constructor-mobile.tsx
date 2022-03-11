import React, { FC } from 'react';
import { useSelector } from '../../hooks';
import ConstructorElementMobile from '../constructor-element-mobile/constructor-element-mobile';
import burgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';
import { TIngredient } from '../../types/types';

const BurgerConstructorMobile:FC = () => {
  const { currentBurger } = useSelector((store) => store.currentBurgerReducer);
  const bun = currentBurger.find((item) => item.type === 'bun');

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
          <li className={burgerConstructorStyles.ingredient} key={el.uuid}>
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
