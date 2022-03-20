import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC } from 'react';
import { Link, match, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MAX_INGREDIENTS } from '../../constants/constants';
import { useSelector } from '../../hooks';
import { TIngredient } from '../../types/types';
import { formatDate, formatStatus } from '../../utils/utils';
import styles from './feed-item.module.css';

type TFeedItem = {
    number: number;
    status: string;
    createdAt: string;
    name: string;
    ingredientsIds: Array<string | TIngredient>;
    isUserOrders: match<{}> | null
}

const FeedItem:FC<TFeedItem> = ({
  number, status, createdAt, name, ingredientsIds, isUserOrders,
}) => {
  const location = useLocation();
  const { ingredients } = useSelector((store) => store.ingredientsReducer);
  const orderIngredients = ingredients
    // eslint-disable-next-line react/destructuring-assignment
    .filter((el) => ingredientsIds.includes(el._id))
    .reverse();

  const orderIngredientsToShow = orderIngredients.length > MAX_INGREDIENTS
    ? orderIngredients.slice(0, MAX_INGREDIENTS)
    : orderIngredients;

  const countOfHidden = orderIngredients.length > MAX_INGREDIENTS
    ? orderIngredients.length - MAX_INGREDIENTS
    : 0;

  const price = orderIngredients.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <Link
      to={{
        pathname: `${location.pathname}/${number}`,
        state: { background: location },
      }}
      className={styles.feedItem}
    >
      <p className={styles.orderNumber}>
        #
        {number}
      </p>
      <p className={styles.orderDate}>{formatDate(createdAt)}</p>
      <p className={styles.orderName}>{name}</p>
      {isUserOrders && <p className={`${styles.orderStatus} ${status === 'done' && styles.orderDone}`}>{formatStatus(status)}</p>}
      <div className={styles.imgContainer}>
        { orderIngredientsToShow.map((el, index) => (
          <div key={`${el._id}_${uuidv4()}`}>
            <img
              src={el.image}
              alt={el.name}
            />
            { index === 0 && countOfHidden > 0 && (
            <span className={styles.count}>
              +
              {countOfHidden}
            </span>
            )}
          </div>
        ))}
      </div>
      <p className={styles.price}>
        {price}
        <CurrencyIcon type="primary" />
      </p>
    </Link>
  );
};

export default FeedItem;
