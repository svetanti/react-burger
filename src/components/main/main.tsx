import React, { FC } from 'react';
import mainStyles from './main.module.css';

const Main:FC = ({ children }) => (
  <div className={mainStyles.main}>
    {children}
  </div>
);

export default Main;
