import React, { useCallback, useEffect, useState } from 'react';
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
import {
  ADD_INGREDIENT,
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT,
  DELETE_INGREDIENT_DATA,
  MOVE_CONSTRUCTOR_ELEMENT,
  getIngredients,
  TOGGLE_MODAL,
  getOrder,
} from '../../services/actions/actions';

function App() {
  const dispatch = useDispatch();
  const [isMenuOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState('');
  const { width } = useWindowSize();
  const isTablet = width <= 1024;
  const [isConstructorOpened, setIsConstructorOpened] = useState(true);

  const { currentBurger } = useSelector((store) => store.currentBurgerReducer);
  const { isModalOpened } = useSelector((store) => store.modalReducer);
  const { order } = useSelector((store) => store.orderReducer);

  let modalContent;
  let headerText;
  switch (currentModal) {
    case 'ingredientDetails': {
      modalContent = <IngredientDetails />;
      headerText = 'Детали ингредиента';
      break;
    }
    case 'orderDetails': {
      modalContent = <OrderDetails orderNumber={order.number} />;
      headerText = isTablet ? 'Заказ оформлен' : '';
      break;
    }
    default: {
      modalContent = '';
    }
  }

  const openIngredientDetails = (item) => {
    dispatch({ type: ADD_INGREDIENT_DATA, item });
    dispatch({ type: TOGGLE_MODAL });
    setCurrentModal('ingredientDetails');
  };

  const openOrderDetails = () => {
    setCurrentModal('orderDetails');
    dispatch({ type: TOGGLE_MODAL });
  };

  const makeOrder = (orderData) => {
    dispatch(getOrder(orderData));
    openOrderDetails();
  };

  const closeModal = () => {
    dispatch({ type: DELETE_INGREDIENT_DATA });
    dispatch({ type: TOGGLE_MODAL });
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
    dispatch({ type: ADD_INGREDIENT, item });
  };

  const handleMove = useCallback((dragIndex, hoverIndex) => {
    dispatch({ type: MOVE_CONSTRUCTOR_ELEMENT, payload: { dragIndex, hoverIndex } });
  }, [dispatch]);

  const handleDeleteIngredient = (item) => {
    const index = currentBurger.indexOf(item);
    dispatch({ type: DELETE_INGREDIENT, index });
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    setIsConstructorOpened(!isTablet);
  }, [isTablet]);

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
            onMoveHandler={handleMove}
            onDelete={handleDeleteIngredient}
          />
          )}
        </DndProvider>
      </Main>
      {isModalOpened && (
      <Modal
        onClose={closeModal}
        header={headerText}
      >
        {modalContent}

      </Modal>
      )}
    </div>
  );
}

export default App;
