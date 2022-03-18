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
  const currentOrders = isUserOrders ? [...userOrders].reverse() : orders;

  useEffect(
    () => {
      dispatch(isUserOrders ? wsConnectionStartUser() : wsConnectionStart());
    },
    [],
  );

  const content = useMemo(
    () => currentOrders.map((item) => (
      <FeedItem
        isUserOrders={isUserOrders}
        key={`${item._id}_${uuidv4()}`}
        number={item.number}
        status={item.status}
        createdAt={item.createdAt}
        name={item.name}
        ingredientsIds={item.ingredients}
      />
    )),
    [currentOrders],
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
