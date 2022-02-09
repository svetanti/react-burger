import React from 'react';
import {
  Route, useLocation, useHistory,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Modal from '../modal/modal';
import ProtectedRoute from '../protected-route/protected-route';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { DELETE_INGREDIENT_DATA, DELETE_ORDER_DATA } from '../../services/actions/actions';

function ModalSwitch({ children, headerText }) {
  const dispatch = useDispatch();
  const location = useLocation();
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
}

ModalSwitch.propTypes = {
  children: PropTypes.element.isRequired,
  headerText: PropTypes.string.isRequired,
};

export default ModalSwitch;
