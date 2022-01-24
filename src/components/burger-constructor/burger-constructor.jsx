import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import {
  ConstructorElement, DragIcon, CurrencyIcon, Button, CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import BurgerConstructorMobile from './burger-constructor-mobile';

function BurgerConstructor({
  onOrder, isTablet, onCloseConstructor, onDropHandler, onDelete,
}) {
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      onDropHandler(item);
    },
  });
  const { currentBurger } = useSelector((store) => store.ingredientsReducer);
  const bun = currentBurger && currentBurger.find((item) => item.type === 'bun');
  const totalPrice = currentBurger.length
    ? currentBurger.reduce((prev, cur) => (cur.type !== 'bun' ? prev + cur.price : cur.price * 2), 0)
    : 0;
  /* const { ingredients } = useSelector((store) => store.ingredientsReducer);

  useEffect(() => {
    constructorStateDispatcher({ type: 'initiate' });
    constructorStateDispatcher({ type: 'count' });
  }, [ingredients]); */

  const handleOrder = () => {
    /*  const orderData = [constructorState.bun, ...constructorState.burgerIngredients]
      .map((item) => item._id); */
    console.log('Кря!');
    onOrder({});
  };

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
              {currentBurger.filter((item) => item.type !== 'bun').map((el) => (
                <li
                  className={burgerConstructorStyles.ingredient}
                  key={el._id}
                >
                  <DragIcon type="primary" />
                  <ConstructorElement
                    isLocked={false}
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                    handleClose={() => onDelete(el)}
                  />
                </li>
              ))}
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
          disabled={!currentBurger.length}
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
  onDelete: PropTypes.func.isRequired,
};

export default BurgerConstructor;
