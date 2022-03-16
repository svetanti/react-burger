import React, { FC, useEffect, useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from '../../hooks';
import { wsConnectionStart, wsConnectionStartUser } from '../../redux/actions/ws-actions';
import FeedItem from '../feed-item/feed-item';
import styles from './feed.module.css';

const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, userOrders } = useSelector((store) => store.wsReducer);
  const isUserOrders = useRouteMatch({
    path: '/profile/orders/',
  });

  useEffect(
    () => {
      dispatch(isUserOrders ? wsConnectionStartUser() : wsConnectionStart());
    },
    [],
  );

  const content = isUserOrders
    ? useMemo(
      () => userOrders.map((item) => (
        <FeedItem
          key={`${item._id}_${uuidv4()}`}
          number={item.number}
          createdAt={item.createdAt}
          name={item.name}
          ingredientsIds={item.ingredients}
        />
      )),
      [userOrders],
    )
    : useMemo(
      () => orders.map((item) => (
        <FeedItem
          key={`${item._id}_${uuidv4()}`}
          number={item.number}
          createdAt={item.createdAt}
          name={item.name}
          ingredientsIds={item.ingredients}
        />
      )),
      [orders],
    );

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {content}
      </ul>
    </section>
  );
};

export default Feed;
