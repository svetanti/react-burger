import { useEffect, useState } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import Main from '../main/main';
import { API_URL } from '../../constants/constants';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal.overlay';

function App() {
const [ingredients, setIngredients] = useState([]);
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);

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

const openIngredientDetails = () => {
  console.log('Кря!');
  setIsModalOpen(true);
};

const openOrderDetails = () => {
  console.log('Кар!');
}

const closeModal = () => {
  setIsModalOpen(false);
};

  return (
    <div className={appStyles.app}>
      <AppHeader isMenuOpen={isMenuOpen} />
      <Main>
        <BurgerIngredients ingredients={ingredients} onModalOpen={openIngredientDetails}/>
        <BurgerConstructor ingredients={ingredients} onModalOpen={openOrderDetails} />
      </Main>
      {isModalOpen && (
        <>
          <ModalOverlay onClose={closeModal}/>
          <Modal onClose={closeModal}>
            <div></div>
          </Modal>
        </>
      )}
    </div>
  );
}

export default App;
