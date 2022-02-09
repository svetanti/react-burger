import React, {
  useCallback, useEffect, useState,
} from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
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
  MOVE_CONSTRUCTOR_ELEMENT,
  getIngredients,
  getOrder,
} from '../../services/actions/actions';
import {
  ConstructorPage,
  ForgotPasswordPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
} from '../../pages';
import ProtectedRoute from '../protected-route/protected-route';
import { getUser } from '../../services/actions/auth-actions';
import Spinner from '../ui/spinner/spinner';
import ModalSwitch from '../modal-switch/modal-switch';

function App() {
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation();
  const background = location.state && location.state.background;

  const [isMenuOpen] = useState(false);
  const { width } = useWindowSize();
  const isTablet = width <= 1024;
  const [isConstructorOpened, setIsConstructorOpened] = useState(true);

  const { currentBurger } = useSelector((store) => store.currentBurgerReducer);
  const { ingredientsRequest } = useSelector((store) => store.ingredientsReducer);
  const { order } = useSelector((store) => store.orderReducer);
  const { isAuth } = useSelector((store) => store.authReducer);

  const currentBurgerIngredients = [...currentBurger].filter((item) => item.type !== 'bun');

  const headerText = isTablet ? 'Заказ оформлен' : '';

  const openIngredientDetails = (item) => {
    dispatch({ type: ADD_INGREDIENT_DATA, item });
  };

  const makeOrder = (orderData) => {
    dispatch(getOrder(orderData));
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

  useEffect(() => {
    if (!isAuth && localStorage.getItem('jwt')) {
      dispatch(getUser());
    }
  }, []);

  useEffect(() => {
    if (order.number) {
      history.push(`/profile/orders/${order.number}`, { background: location });
    }
  }, [order]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={appStyles.app}>
        <AppHeader isMenuOpen={isMenuOpen} isTablet={isTablet} />
        <ModalSwitch headerText={headerText}>
          <Switch location={background || location}>
            <Route path="/" exact>
              { ingredientsRequest
                ? (<Spinner />)
                : (
                  <ConstructorPage
                    onModalOpen={openIngredientDetails}
                    onOpenConstructor={openConstructor}
                    onIngredientAdd={handleDrop}
                    onOrder={makeOrder}
                    onCloseConstructor={closeConstructor}
                    onDropHandler={handleDrop}
                    onMove={handleMove}
                    onDelete={handleDeleteIngredient}
                    isTablet={isTablet}
                    isConstructorOpened={isConstructorOpened}
                    header={headerText}
                    orderNumber={order.number}
                  />
                )}
            </Route>
            <Route path="/ingredients/:id" exact>
              <IngredientDetails />
            </Route>
            <Route path="/profile/orders/:orderNumber" exact>
              <OrderDetails />
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
            <ProtectedRoute path="/profile">
              <ProfilePage />
            </ProtectedRoute>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </ModalSwitch>
      </div>
    </DndProvider>
  );
}

export default App;
