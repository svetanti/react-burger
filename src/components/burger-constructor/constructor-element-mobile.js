import React from 'react';
import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css';

function ConstructorElementMobile({ text, thumbnail, price }) {
  return (
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
}

ConstructorElementMobile.propTypes = {
  text: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ConstructorElementMobile;
