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
                <NavLink to="/" className={headerStyles.link} activeClassName={headerStyles.linkActive}>
                  <BurgerIcon type="primary" />
                  <span>Конструктор</span>
                </NavLink>
                <NavLink to="/list" className={headerStyles.link} activeClassName={headerStyles.linkActive}>
                  <ListIcon type="secondary" />
                  <span>Лента заказов</span>
                </NavLink>
              </nav>
              <span className={headerStyles.logo}><Logo /></span>
              <button className={headerStyles.button} type="button">
                <ProfileIcon type="secondary" />
                <span>Личный кабинет</span>
              </button>
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
