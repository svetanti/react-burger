import React, { FC } from 'react';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import Main from '../components/main/main';
import { TIngredient } from '../types/types';

type TConstructorPageProps = {
  onModalOpen: (el: TIngredient) => void;
  onOpenConstructor: () => void;
  onIngredientAdd: (el: TIngredient) => void;
  isTablet: boolean;
  isConstructorOpened: boolean;
  onOrder: (order: Array<TIngredient>) => void;
  onCloseConstructor: () => void;
  onDropHandler: (item: TIngredient) => void;
  onMove: (dragIndex: any, hoverIndex: any) => void;
  onDelete: (item: TIngredient) => void;
};

const ConstructorPage:FC<TConstructorPageProps> = ({
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
}) => {
  const openIngredientDetails = (item: TIngredient) => {
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
};

export default ConstructorPage;
