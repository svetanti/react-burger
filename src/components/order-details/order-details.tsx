import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Done from '../ui/done/done';
import orderDetailsStyles from './order-details.module.css';

type TParams = {
  orderNumber: string
};

const OrderDetails:FC = () => {
  const { orderNumber } = useParams<TParams>();

  return (
    <div className={orderDetailsStyles.wrapper}>
      <h2 className={orderDetailsStyles.number} id="orderNumber">{orderNumber}</h2>
      <p className={orderDetailsStyles.subtitle}>идентификатор заказа</p>
      <Done />
      <p className={orderDetailsStyles.text}>Ваш заказ начали готовить</p>
      <p className={orderDetailsStyles.subtext}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;
