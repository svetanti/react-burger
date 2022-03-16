import React, { FC } from 'react';
import { useSelector } from '../../hooks';
import styles from './feed-statistics.module.css';

const FeedStatistics: FC = () => {
  const { total, totalToday, orders } = useSelector((store) => store.wsReducer);
  const done = orders.filter((item) => item.status === 'done');
  const inProgress = orders.filter((item) => item.status !== 'done');
  return (
    <div className={styles.container}>
      <div className={styles.ordersWrapper}>
        <div className={styles.ordersBlock}>
          <h2 className={styles.text}>Готовы:</h2>
          <ul className={styles.list}>
            {done.map((el) => <li key={el._id} className={styles.done}>{el.number}</li>)}
          </ul>
        </div>
        <div className={styles.ordersBlock}>
          <h2 className={styles.text}>В работе:</h2>
          <ul className={styles.list}>
            {inProgress.map((el) => <li key={el._id}>{el.number}</li>)}
          </ul>
        </div>
      </div>
      <h2 className={styles.text}>Выполнено за все время:</h2>
      <p className={styles.total}>{total}</p>
      <h2 className={styles.text}>Выполнено за сегодня:</h2>
      <p className={styles.total}>{totalToday}</p>
    </div>

  );
};

export default FeedStatistics;
