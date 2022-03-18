import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from '../../hooks';
import {
  wsConnectionStart, wsConnectionStartUser,
} from '../../redux/actions/ws-actions';
import { countDuplicates, formatDate } from '../../utils/utils';
import styles from './order.module.css';

type TParams = {
    id: string
  };

const Order:FC = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector((store) => store.ingredientsReducer);
  const { orders, userOrders } = useSelector((store) => store.wsReducer);
  const isUserOrders = useRouteMatch({
    path: '/profile/orders/:id',
  });
  const { id } = useParams<TParams>();
  const order = orders && orders.find((item) => item.number === +id);
  const userOrder = userOrders && userOrders.find((item) => item.number === +id);
  const currentOrder = isUserOrders ? userOrder : order;
  const orderIngredients = ingredients && countDuplicates(
    ingredients.filter((item) => currentOrder?.ingredients.includes(item._id)),
  );
  const price = orderIngredients.reduce((acc, cur) => (
    cur.count ? acc + cur.price * cur.count : acc + cur.price), 0);

  useEffect(() => {
    dispatch(isUserOrders ? wsConnectionStartUser() : wsConnectionStart());
  }, []);

  return (
    <div className={styles.container}>
      { currentOrder
      && (
      <>
        <h2 className={styles.title}>{currentOrder.name}</h2>
        <p className={styles.status}>{currentOrder.status === 'done' ? 'Выполнен' : currentOrder.status}</p>
        <p className={styles.title}>Состав:</p>
        <ul className={styles.list}>
          {orderIngredients.map((el) => (
            <li key={el._id} className={styles.item}>
              <div className={styles.imgWrapper}>
                <img
                  className={styles.img}
                  src={el.image}
                  alt={el.name}
                />
              </div>
              <p className={styles.text}>{el.name}</p>
              <p className={styles.price}>
                {el.count}
                {' '}
                x
                {' '}
                {el.price}
                <CurrencyIcon type="primary" />
              </p>
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <p className={styles.date}>{formatDate(currentOrder.createdAt)}</p>
          <p className={styles.price}>
            {price}
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </>
      )}
    </div>
  );
};

export default Order;
