import React, { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import Main from '../main/main';
import API_URL from '../../constants/constants';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal.overlay';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import useWindowSize from '../../hooks/useWindowSize';

function App() {
  const [ingredients, setIngredients] = useState([] as any[]);
  const [isMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState('');
  const [currentIngredient, setCurrentIngredient] = useState({});
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

  const openIngredientDetails = (id: string) => {
    if (ingredients) {
      setCurrentIngredient(ingredients.find((item) => item._id === id));
    }
    setIsModalOpen(true);
    setCurrentModal('ingredientDetails');
  };

  const openOrderDetails = () => {
    setIsModalOpen(true);
    setCurrentModal('orderDetails');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openConstructor = () => {
    setIsConstructorOpened(true);
  };

  const closeConstructor = () => {
    setIsConstructorOpened(false);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          return res.json()
            .then((err) => {
              throw new Error(err.message);
            });
        }
        return res.json();
      })
      .then((data) => {
        setIngredients(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setIsConstructorOpened(!isTablet);
  }, [isTablet]);

  return (
    <div className={appStyles.app}>
      <AppHeader isMenuOpen={isMenuOpen} isTablet={isTablet} />
      <Main>
        <BurgerIngredients
          ingredients={ingredients}
          onModalOpen={openIngredientDetails}
          onOpenConstructor={openConstructor}
          isTablet={isTablet}
        />
        { isConstructorOpened && (
        <BurgerConstructor
          ingredients={ingredients}
          onModalOpen={openOrderDetails}
          isTablet={isTablet}
          onCloseConstructor={closeConstructor}
        />
        )}
      </Main>
      {isModalOpen && (
      <>
        <ModalOverlay onClose={closeModal} />
        <Modal
          onClose={closeModal}
          header={headerText}
        >
          { currentModal === 'ingredientDetails'
            ? <IngredientDetails ingredient={currentIngredient} />
            : <OrderDetails />}
        </Modal>
      </>
      )}
    </div>
  );
}

export default App;
