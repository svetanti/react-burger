import React, { FC } from 'react';
import FeedStatistics from '../components/feed-statistics/feed-statistics';
import Feed from '../components/feed/feed';
import Main from '../components/main/main';
import styles from './feed-page.module.css';

const FeedPage:FC = () => (
  <Main>
    <div>
      <h1 className={styles.title}>Лента заказов</h1>
      <Feed />
    </div>
    <FeedStatistics />
  </Main>
);

export default FeedPage;
