import React, {
  useCallback, useEffect, useState,
} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
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
import {
  ConstructorPage,
  ForgotPasswordPage,
  IngredientPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '../../pages';

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

  const handleMove = useCallback((dragIndex, hoverIndex) => {
    const bun = [...currentBurger].find((item) => item.type === 'bun');
    const dragElement = currentBurgerIngredients[dragIndex];
    const payload = bun
      ? [bun, ...update(currentBurgerIngredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragElement],
        ],
      })]
      : update(currentBurgerIngredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragElement],
        ],
      });
    dispatch({ type: MOVE_CONSTRUCTOR_ELEMENT, payload });
  }, [currentBurgerIngredients]);

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
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className={appStyles.app}>
          <AppHeader isMenuOpen={isMenuOpen} isTablet={isTablet} />
          <Switch>
            <Route path="/" exact>
              <ConstructorPage
                onModalOpen={openIngredientDetails}
                onOpenConstructor={openConstructor}
                onIngredientAdd={handleDrop}
                onOrder={makeOrder}
                onCloseConstructor={closeConstructor}
                onDropHandler={handleDrop}
                onMove={handleMove}
                onDelete={handleDeleteIngredient}
                onClose={closeModal}
                isTablet={isTablet}
                isConstructorOpened={isConstructorOpened}
                isModalOpened={isModalOpened}
                header={headerText}
                modalContent={modalContent}
              />
            </Route>
            <Route path="/ingredients/:id" exact>
              <IngredientPage />
            </Route>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password" exact>
              <ForgotPasswordPage />
            </Route>
            <Route path="/reset-password" exact>
              <ResetPasswordPage />
            </Route>
            <Route path="/profile" exact>
              <ProfilePage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;
