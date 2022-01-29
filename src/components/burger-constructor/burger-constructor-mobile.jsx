import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ConstructorElementMobile from './constructor-element-mobile';
import burgerConstructorStyles from './burger-constructor.module.css';

function BurgerConstructorMobile() {
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
        {currentBurger.filter((item) => item.type !== 'bun').map((el) => (
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
}

export default BurgerConstructorMobile;
