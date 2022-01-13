import React from 'react';
import PropTypes from 'prop-types';
import { MenuIcon, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerMenuStyles from './burger-menu.module.css';

function BurgerMenu({ isMenuOpen }) {
  return (
    <div className={burgerMenuStyles.menu}>
      { isMenuOpen ? (<CloseIcon type="primary" />) : (<MenuIcon type="primary" />) }
    </div>
  );
}

BurgerMenu.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
};

export default BurgerMenu;
