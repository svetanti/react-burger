import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import {
  ConstructorElement, CurrencyIcon, Button, CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../hooks';
import styles from './burger-constructor.module.css';
import BurgerConstructorMobile from '../burger-constructor-mobile/burger-constructor-mobile';
import BurgerConstructorElement from '../burger-constructor-element/burger-constructor-element';
import { TIngredient } from '../../types/types';

type TBurgerConstructorProps = {
  onOrder: (order: ReadonlyArray<TIngredient>) => void;
  isTablet: boolean;
  onCloseConstructor: () => void;
  onDropHandler: (item: TIngredient) => void;
  onDelete: (item: TIngredient) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
};

const BurgerConstructor:FC<TBurgerConstructorProps> = ({
  onOrder, isTablet, onCloseConstructor, onDropHandler, onDelete, onMove,
}) => {
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      onDropHandler(item);
    },
  });

  const history = useHistory();

  const { currentBurger } = useSelector((store) => store.currentBurgerReducer);
  const { isOrderRequest } = useSelector((store) => store.orderReducer);
  const { isAuth } = useSelector((store) => store.authReducer);

  const bun = currentBurger && currentBurger.find((item: TIngredient) => item.type === 'bun');
  const totalPrice = currentBurger.length
    ? currentBurger.reduce((prev: number, cur: TIngredient) => (cur.type !== 'bun' ? prev + cur.price : prev + cur.price * 2), 0)
    : 0;

  const handleOrder = () => {
    if (isAuth) {
      onOrder(currentBurger);
    } else {
      history.push('/login');
    }
  };

  const content = useMemo(
    () => currentBurger
      .filter((item: TIngredient) => item.type !== 'bun')
      .map((el: TIngredient, index: number) => (
        <BurgerConstructorElement
          el={el}
          id={el.uuid as string}
          key={el.uuid as string}
          index={index}
          onDelete={onDelete}
          onMove={onMove}
        />
      )),
    [currentBurger],
  );

  return (
    <section className={styles.container} ref={dropTarget}>
      { isTablet
        ? (
          <>
            <div className={styles.mobilePanel}>
              <span>Заказ</span>
              <CloseIcon type="primary" onClick={onCloseConstructor} />
            </div>
            <BurgerConstructorMobile />
          </>
        )
        : (
          <>
            { bun && (
            <div className={styles.ingridientWrapper}>
              <ConstructorElement
                type="top"
                isLocked
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
            )}
            <ul className={styles.list}>
              {content}
            </ul>
            {bun && (
            <div className={styles.ingridientWrapper}>
              <ConstructorElement
                type="bottom"
                isLocked
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
            )}
          </>
        )}
      <div className={styles.totalWrapper}>
        <p className={styles.price}>
          <span>{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="medium"
          onClick={handleOrder}
          disabled={!currentBurger.length || isOrderRequest || !bun}
        >
          {isTablet ? 'Заказать' : 'Оформить заказ'}
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
