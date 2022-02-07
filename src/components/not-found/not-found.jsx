import React from 'react';
import styles from './not-found.module.css';

function NotFound() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>404</p>
      <p className={styles.text}>Такой страницы не существует</p>
    </div>
  );
}

export default NotFound;
