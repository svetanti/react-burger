import React, { FC, useEffect, useState } from 'react';
import {
  Route, useLocation, useHistory,
} from 'react-router-dom';
import { useDispatch } from '../../hooks';
import Modal from '../modal/modal';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import {
  deleteIngredientData, deleteOrderData,
} from '../../redux/actions/actions';
import { TLocationState } from '../../types/types';
import Order from '../order/order';

type TModalSwitchProps = {
  headerText: string;
};

const ModalSwitch:FC<TModalSwitchProps> = ({ children, headerText }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();
  const history = useHistory();
  const background = location.state && location.state.background;

  useEffect(() => {
    const id = location.pathname.split('/').at(-1);
    if (id) setOrderNumber(id);
  }, [location]);

  const handleModalClose = () => {
    history.goBack();
  };

  const closeIngredient = () => {
    dispatch(deleteIngredientData());
    handleModalClose();
  };

  const closeOrderDetails = () => {
    dispatch(deleteOrderData());
    handleModalClose();
  };

  const closeOrder = () => {
    handleModalClose();
  };

  return (
    <>
      {children}

      {background && (
      <Route
        path="/ingredients/:id"
      >
        <Modal onClose={closeIngredient} header="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      </Route>
      )}
      {background && (
      <Route
        path="/feed/:id"
      >
        <Modal
          onClose={closeOrder}
          header={`#${orderNumber}`}
          headerStyle="text text_type_digits-default"
        >
          <Order />
        </Modal>
      </Route>
      )}
      {background && (
      <ProtectedRoute
        path="/profile/orders/:id"
      >
        <Modal
          onClose={closeOrder}
          header={`#${orderNumber}`}
          headerStyle="text text_type_digits-default"
        >
          <Order />
        </Modal>
      </ProtectedRoute>
      )}
      {background && (
      <ProtectedRoute
        path="/orders/:orderNumber"
      >
        <Modal onClose={closeOrderDetails} header={headerText}>
          <OrderDetails />
        </Modal>
      </ProtectedRoute>
      )}
    </>
  );
};

export default ModalSwitch;
