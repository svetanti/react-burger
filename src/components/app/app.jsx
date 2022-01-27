import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
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
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { debounce } from '../../utils/utils';

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

  const currentBurgerIngredients = [...currentBurger].filter((item) => item.type !== 'bun');

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

  const findIngredient = useCallback((id) => {
    const ingredient = currentBurgerIngredients.filter((c) => `${c._id}` === id)[0];
    return {
      ingredient,
      index: currentBurgerIngredients.indexOf(ingredient),
    };
  }, [[...currentBurger].filter((item) => item.type !== 'bun')]);

  const handleMoveToDebounce = useCallback((_id, atIndex) => {
    const { ingredient, index } = findIngredient(_id);
    const bun = [...currentBurger].find((item) => item.type === 'bun');
    const payload = bun
      ? [bun, update(currentBurgerIngredients, {
        $splice: [
          [index, 1],
          [atIndex, 0, ingredient],
        ],
      })]
      : update(currentBurgerIngredients, {
        $splice: [
          [index, 1],
          [atIndex, 0, ingredient],
        ],
      });
    dispatch({ type: MOVE_CONSTRUCTOR_ELEMENT, payload });
  }, [findIngredient, currentBurgerIngredients]);

  const handleMove = debounce(handleMoveToDebounce);

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
      <DndProvider backend={HTML5Backend}>
        <AppHeader isMenuOpen={isMenuOpen} isTablet={isTablet} />
        <Main>
          <BurgerIngredients
            onModalOpen={openIngredientDetails}
            onOpenConstructor={openConstructor}
            onIngredientAdd={handleDrop}
            isTablet={isTablet}
          />
          { isConstructorOpened && (
          <BurgerConstructor
            onOrder={makeOrder}
            isTablet={isTablet}
            onCloseConstructor={closeConstructor}
            onDropHandler={handleDrop}
            onMove={handleMove}
            findIngredient={findIngredient}
            onDelete={handleDeleteIngredient}
          />
          )}
        </Main>
        {isModalOpened && (
        <Modal
          onClose={closeModal}
          header={headerText}
        >
          {modalContent}
        </Modal>
        )}
      </DndProvider>
    </div>

  );
}

export default App;
