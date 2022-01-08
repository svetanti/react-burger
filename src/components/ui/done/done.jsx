import React from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import doneStyles from './done.module.css';
import doneBgPath1 from '../../../images/done_bg_1.svg';
import doneBgPath2 from '../../../images/done_bg_2.svg';
import doneBgPath3 from '../../../images/done_bg_3.svg';

function Done() {
  return (
    <div className={doneStyles.done}>
      <img src={doneBgPath1} className={doneStyles.icon} alt="" />
      <img src={doneBgPath2} className={doneStyles.icon} alt="" />
      <img src={doneBgPath3} className={doneStyles.icon} alt="" />
      <CheckMarkIcon type="primary" />
    </div>
  );
}

export default Done;
