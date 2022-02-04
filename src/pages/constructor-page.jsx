import React from 'react';
import PropTypes from 'prop-types';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import Main from '../components/main/main';
import Modal from '../components/modal/modal';

function ConstructorPage({
  onModalOpen,
  onOpenConstructor,
  onIngredientAdd,
  isTablet,
  isConstructorOpened,
  onOrder,
  onCloseConstructor,
  onDropHandler,
  onMove,
  onDelete,
  isModalOpened,
  onClose,
  header,
  modalContent,
}) {
  return (
    <>
      <Main>
        <BurgerIngredients
          onModalOpen={onModalOpen}
          onOpenConstructor={onOpenConstructor}
          onIngredientAdd={onIngredientAdd}
          isTablet={isTablet}
        />
        { isConstructorOpened && (
        <BurgerConstructor
          onOrder={onOrder}
          isTablet={isTablet}
          onCloseConstructor={onCloseConstructor}
          onDropHandler={onDropHandler}
          onMove={onMove}
          onDelete={onDelete}
        />
        )}
      </Main>
      {isModalOpened && (
      <Modal
        onClose={onClose}
        header={header}
      >
        {modalContent}
      </Modal>
      )}
    </>
  );
}

ConstructorPage.propTypes = {
  onModalOpen: PropTypes.func.isRequired,
  onOpenConstructor: PropTypes.func.isRequired,
  onIngredientAdd: PropTypes.func.isRequired,
  isTablet: PropTypes.bool.isRequired,
  isConstructorOpened: PropTypes.bool.isRequired,
  onOrder: PropTypes.func.isRequired,
  onCloseConstructor: PropTypes.func.isRequired,
  onDropHandler: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isModalOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  modalContent: PropTypes.element.isRequired,
};

export default ConstructorPage;
