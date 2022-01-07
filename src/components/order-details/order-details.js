import React from 'react';
import Done from '../ui/done/done';
import orderDetailsStyles from './order-details.module.css';

function OrderDetails() {
  return (
    <div className={orderDetailsStyles.wrapper}>
      <h2 className={orderDetailsStyles.number}>034536</h2>
      <p className={orderDetailsStyles.subtitle}>идентификатор заказа</p>
      <Done />
      <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
      <p className={orderDetailsStyles.subtext}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
}

export default OrderDetails;
