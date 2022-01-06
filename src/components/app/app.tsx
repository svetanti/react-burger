import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import Main from '../main/main';
import { API_URL } from '../../constants/constants';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal.overlay';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

function App() {
const [ingredients, setIngredients] = useState([] as any[]);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);
const [currentModal, setCurrentModal] = useState('');
const [currentIngredient, setCurrentIngredient] = useState({});
const [width, setWidth] = useState<number>(window.innerWidth);
const isTablet = width <= 1024;
const [isConstructorOpened, setIsConstructorOpened] = useState(false);

const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
};

useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);

useEffect(() => {
  fetch(API_URL)
      .then(res => {
        if (!res.ok) {
          return res.json()
            .then((err) => {
              throw new Error(err.message);
            });
        }
        return res.json();
      })
      .then(data => {
        setIngredients(data.data)
      })
      .catch(err => console.log(err));
}, []);

useEffect(() => {
    function closeOnEsc(e: { key: string; }) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        closeModal();
      }
    }
    document.addEventListener("keyup", closeOnEsc);

    return () => {
      document.removeEventListener("keyup", closeOnEsc);
    };
  }, []);

const openIngredientDetails = (id: string) => {
  if (ingredients) {
    setCurrentIngredient(ingredients.find(item => item._id === id));
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

return (
  <div className={appStyles.app}>
    <AppHeader isMenuOpen={isMenuOpen} />
    <Main>
      <BurgerIngredients ingredients={ingredients} onModalOpen={openIngredientDetails} onOpenConstructor={openConstructor}/>
      <BurgerConstructor 
        ingredients={ingredients}
        onModalOpen={openOrderDetails}
        isTablet={isTablet}
        isConstructorOpened={isConstructorOpened}
        onCloseConstructor={closeConstructor} />
    </Main>
    {isModalOpen && (
      <>
        <ModalOverlay onClose={closeModal}/>
        <Modal onClose={closeModal} header={currentModal === 'ingredientDetails' ? 'Детали ингредиента' : ''}>
          { currentModal === 'ingredientDetails' 
          ? <IngredientDetails ingredient={currentIngredient} />
          : <OrderDetails />
          }
        </Modal>
      </>
    )}
  </div>
)};

export default App;
