/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Logo, BurgerIcon, ListIcon, ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import headerStyles from './app-header.module.css';
import MobileLogo from '../ui/mobile-logo/mobile-logo';
import BurgerMenu from '../ui/burger-menu/burger-menu';

function AppHeader({ isMenuOpen, isTablet }) {
  return (
    <header className={headerStyles.header}>
      <div className={headerStyles.contentWrapper}>
        { isTablet ? (
          <>
            <MobileLogo />
            <BurgerMenu isMenuOpen={isMenuOpen} />
          </>
        )
          : (
            <>
              <nav className={headerStyles.nav}>
                <NavLink exact to="/" className={headerStyles.link} activeClassName={headerStyles.linkActive}>
                  <BurgerIcon type="secondary" />
                  <span>Конструктор</span>
                </NavLink>
                <NavLink exact to="/orders" className={headerStyles.link} activeClassName={headerStyles.linkActive}>
                  <ListIcon type="secondary" />
                  <span>Лента заказов</span>
                </NavLink>
              </nav>
              <span className={headerStyles.logo}><Logo /></span>
              <NavLink exact to="/profile" className={headerStyles.button} activeClassName={headerStyles.linkActive} type="button">
                <ProfileIcon type="secondary" />
                <span>Личный кабинет</span>
              </NavLink>
            </>
          )}
      </div>
    </header>
  );
}

AppHeader.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  isTablet: PropTypes.bool.isRequired,
};

export default AppHeader;
