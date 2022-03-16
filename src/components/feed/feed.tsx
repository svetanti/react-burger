import React, { FC, useEffect, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from '../../hooks';
import { wsConnectionStart } from '../../redux/actions/ws-actions';
import FeedItem from '../feed-item/feed-item';
import styles from './feed.module.css';

const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.wsReducer);

  useEffect(
    () => {
      dispatch(wsConnectionStart());
    },
    [],
  );

  const content = useMemo(
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
      <h1 className={styles.title}>Лента заказов</h1>
      <ul className={styles.list}>
        {content}
      </ul>
    </section>
  );
};

export default Feed;
