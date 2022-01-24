import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import Main from '../main/main';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import useWindowSize from '../../hooks/useWindowSize';
import * as api from '../../utils/api';
import {
  ADD_INGREDIENT, ADD_INGREDIENT_DATA, DELETE_INGREDIENT, DELETE_INGREDIENT_DATA, getIngredients,
} from '../../services/actions/actions';

function App() {
  const dispatch = useDispatch();
  const [isMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState('');
  const [orderNumber, setOrderNumber] = useState(0);
  const { width } = useWindowSize();
  const isTablet = width <= 1024;
  const [isConstructorOpened, setIsConstructorOpened] = useState(true);
  let headerText;
  if (currentModal === 'ingredientDetails') {
    headerText = 'Детали ингредиента';
  } else if (isTablet) {
    headerText = 'Заказ оформлен';
  } else {
    headerText = '';
  }

  const { currentBurger } = useSelector((store) => store.ingredientsReducer);

  const openIngredientDetails = (id) => {
    dispatch({ type: ADD_INGREDIENT_DATA, id });
    setIsModalOpen(true);
    setCurrentModal('ingredientDetails');
  };

  const openOrderDetails = () => {
    setIsModalOpen(true);
    setCurrentModal('orderDetails');
  };

  const makeOrder = (orderData) => {
    api.sendOrder(orderData)
      .then((order) => {
        openOrderDetails();
        setOrderNumber(order);
      })
      .catch((err) => console.log(err));
  };

  const closeModal = () => {
    dispatch({ type: DELETE_INGREDIENT_DATA });
    setIsModalOpen(false);
  };

  const openConstructor = () => {
    setIsConstructorOpened(true);
  };

  const closeConstructor = () => {
    setIsConstructorOpened(false);
  };

  const handleDrop = (item) => {
    if (item.type === 'bun') {
      const bun = currentBurger.find((el) => el.type === 'bun');
      const index = currentBurger.indexOf(bun);
      if (index !== -1) {
        dispatch({ type: DELETE_INGREDIENT, index });
      }
    }
    dispatch({ type: ADD_INGREDIENT, id: item._id });
  };

  const handleDeleteIngredient = (item) => {
    const index = currentBurger.indexOf(item);
    dispatch({ type: DELETE_INGREDIENT, index });
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  /*  useEffect(() => {
    setIsConstructorOpened(!isTablet);
  }, [isTablet]); */

  return (
    <div className={appStyles.app}>
      <AppHeader isMenuOpen={isMenuOpen} isTablet={isTablet} />
      <Main>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients
            onModalOpen={openIngredientDetails}
            onOpenConstructor={openConstructor}
            isTablet={isTablet}
          />
          { isConstructorOpened && (
          <BurgerConstructor
            onOrder={makeOrder}
            isTablet={isTablet}
            onCloseConstructor={closeConstructor}
            onDropHandler={handleDrop}
            onDelete={handleDeleteIngredient}
          />
          )}
        </DndProvider>
      </Main>
      {isModalOpen && (
      <Modal
        onClose={closeModal}
        header={headerText}
      >
          { currentModal === 'ingredientDetails'
            ? <IngredientDetails />
            : <OrderDetails orderNumber={orderNumber} />}
      </Modal>
      )}
    </div>
  );
}

export default App;
