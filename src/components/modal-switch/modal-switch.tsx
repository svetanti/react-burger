import React, { FC } from 'react';
import {
  Route, useLocation, useHistory,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Modal from '../modal/modal';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { DELETE_INGREDIENT_DATA, DELETE_ORDER_DATA } from '../../services/actions/actions';
import { TLocationState } from '../../types/types';

type TModalSwitchProps = {
  headerText: string;
};

const ModalSwitch:FC<TModalSwitchProps> = ({ children, headerText }) => {
  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();
  const history = useHistory();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    history.goBack();
  };

  const closeIngredient = () => {
    dispatch({ type: DELETE_INGREDIENT_DATA });
    handleModalClose();
  };

  const closeOrder = () => {
    dispatch({ type: DELETE_ORDER_DATA });
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
      <ProtectedRoute
        path="/profile/orders/:orderNumber"
      >
        <Modal onClose={closeOrder} header={headerText}>
          <OrderDetails />
        </Modal>
      </ProtectedRoute>
      )}
    </>
  );
};

export default ModalSwitch;
