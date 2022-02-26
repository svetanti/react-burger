import React, { useCallback, useEffect, useState } from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { v4 as uuidv4 } from 'uuid';
import AppHeader from '../app-header/app-header';
import appStyles from './app.module.css';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import useWindowSize from '../../hooks/useWindowSize';
import {
  getIngredients,
  getOrder,
  addIngredientData,
  deleteIngredient,
  addIngredient,
  moveConstructorElement,
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
import { TRootState } from '../../services/reducers';
import { TIngredient, TLocationState } from '../../types/types';

const App = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const location = useLocation<TLocationState>();
  const background = location.state && location.state.background;

  const [isMenuOpen] = useState(false);
  const { width } = useWindowSize();
  const isTablet = width <= 1024;
  const [isConstructorOpened, setIsConstructorOpened] = useState(true);

  const { currentBurger } = useSelector((store: TRootState) => store.currentBurgerReducer);
  const { ingredientsRequest } = useSelector((store: TRootState) => store.ingredientsReducer);
  const { order, isOrderRequest } = useSelector((store: TRootState) => store.orderReducer);
  const { isAuth } = useSelector((store: TRootState) => store.authReducer);

  const currentBurgerIngredients = [...currentBurger].filter((item) => item.type !== 'bun');

  const headerText = isTablet ? 'Заказ оформлен' : '';

  const openIngredientDetails = (item: TIngredient) => {
    dispatch(addIngredientData(item));
  };

  const makeOrder = (orderData: Array<TIngredient>) => {
    dispatch(getOrder(orderData));
  };

  const openConstructor = () => {
    setIsConstructorOpened(true);
  };

  const closeConstructor = () => {
    setIsConstructorOpened(false);
  };

  const handleDrop = (item: TIngredient) => {
    if (item.type === 'bun') {
      const bun = currentBurger.find((el: TIngredient) => el.type === 'bun');
      const index = currentBurger.indexOf(bun);
      if (index !== -1) {
        dispatch(deleteIngredient(index));
      }
    }
    dispatch(addIngredient({ ...item, uuid: uuidv4() }));
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
    dispatch(moveConstructorElement(payload));
  }, [currentBurgerIngredients]);

  const handleDeleteIngredient = (item: TIngredient) => {
    const index = currentBurger.indexOf(item);
    dispatch(deleteIngredient(index));
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
              { ingredientsRequest || isOrderRequest
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
};

export default App;
