import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import {
  ConstructorElement, CurrencyIcon, Button, CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorMobile from './burger-constructor-mobile';
import BurgerConstructorElement from './burger-constructor-element';

function BurgerConstructor({
  onOrder, isTablet, onCloseConstructor, onDropHandler, onDelete, onMoveHandler,
}) {
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      onDropHandler(item);
    },
  });

  const { currentBurger } = useSelector((store) => store.currentBurgerReducer);
  const { orderRequest } = useSelector((store) => store.orderReducer);
  const bun = currentBurger && currentBurger.find((item) => item.type === 'bun');
  const totalPrice = currentBurger.length
    ? currentBurger.reduce((prev, cur) => (cur.type !== 'bun' ? prev + cur.price : cur.price * 2), 0)
    : 0;

  const handleOrder = () => {
    onOrder(currentBurger);
  };

  const content = useMemo(
    () => currentBurger
      .filter((item) => item.type !== 'bun')
      .map((el, index) => (
        <BurgerConstructorElement
          el={el}
          key={`${el._id}_${uuidv4()}`}
          index={index}
          onDelete={onDelete}
          onMove={onMoveHandler}
        />
      )),
    [currentBurger],
  );

  return (
    <section className={burgerConstructorStyles.container} ref={dropTarget}>
      { isTablet
        ? (
          <>
            <div className={burgerConstructorStyles.mobilePanel}>
              <span>Заказ</span>
              <CloseIcon onClick={onCloseConstructor} />
            </div>
            <BurgerConstructorMobile />
          </>
        )
        : (
          <>
            { bun && (
            <div className={burgerConstructorStyles.ingridientWrapper}>
              <ConstructorElement
                type="top"
                isLocked
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
            )}
            <ul className={burgerConstructorStyles.list}>
              {content}
            </ul>
            {bun && (
            <div className={burgerConstructorStyles.ingridientWrapper}>
              <ConstructorElement
                type="bottom"
                isLocked
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
            )}
          </>
        )}
      <div className={burgerConstructorStyles.totalWrapper}>
        <p className={burgerConstructorStyles.price}>
          <span>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="medium"
          onClick={handleOrder}
          disabled={!currentBurger.length || orderRequest}
        >
          {isTablet ? 'Заказать' : 'Оформить заказ'}

        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onOrder: PropTypes.func.isRequired,
  isTablet: PropTypes.bool.isRequired,
  onCloseConstructor: PropTypes.func.isRequired,
  onDropHandler: PropTypes.func.isRequired,
  onMoveHandler: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BurgerConstructor;
