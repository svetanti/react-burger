import React, { FC } from 'react';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from '../burger-constructor/burger-constructor.module.css';

type TConstructorElementMobileProps = {
  text: string
  thumbnail: string
  price: number;
};

const ConstructorElementMobile:FC<TConstructorElementMobileProps> = (
  { text, thumbnail, price },
) => (
  <div className={burgerConstructorStyles.mobileWrapper}>
    <DragIcon type="primary" />
    <div className={burgerConstructorStyles.ingredientContent}>
      <img src={thumbnail} alt={text} className={burgerConstructorStyles.img} />
      <span className={burgerConstructorStyles.text}>{text}</span>
      <span className={burgerConstructorStyles.price}>
        {price}
        <CurrencyIcon type="primary" />
      </span>
    </div>
  </div>
);

export default ConstructorElementMobile;
