import React, { FC } from 'react';
import { MenuIcon, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerMenuStyles from './burger-menu.module.css';

type TBurgerMenuProps = {
  isMenuOpen: boolean;
};

const BurgerMenu:FC<TBurgerMenuProps> = ({ isMenuOpen }) => (
  <div className={burgerMenuStyles.menu}>
    { isMenuOpen ? (<CloseIcon type="primary" />) : (<MenuIcon type="primary" />) }
  </div>
);

export default BurgerMenu;
