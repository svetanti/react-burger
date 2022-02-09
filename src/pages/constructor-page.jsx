import React from 'react';
import PropTypes from 'prop-types';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import Main from '../components/main/main';

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
  orderNumber,
}) {
  const openIngredientDetails = (item) => {
    onModalOpen(item);
  };

  return (
    <Main>
      <BurgerIngredients
        onOpenIngredientDetails={openIngredientDetails}
        onOpenConstructor={onOpenConstructor}
        onIngredientAdd={onIngredientAdd}
        isTablet={isTablet}
      />
      { isConstructorOpened && (
        <BurgerConstructor
          orderNumber={orderNumber}
          onOrder={onOrder}
          isTablet={isTablet}
          onCloseConstructor={onCloseConstructor}
          onDropHandler={onDropHandler}
          onMove={onMove}
          onDelete={onDelete}
        />
      )}
    </Main>
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
  orderNumber: PropTypes.number.isRequired,
};

export default ConstructorPage;
