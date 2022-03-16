/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Logo, BurgerIcon, ListIcon, ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';
import MobileLogo from '../ui/mobile-logo/mobile-logo';
import BurgerMenu from '../ui/burger-menu/burger-menu';

type TAppHeaderProps = {
  isMenuOpen: boolean;
  isTablet: boolean;
};

const AppHeader:FC<TAppHeaderProps> = ({ isMenuOpen, isTablet }) => (
  <header className={headerStyles.header}>
    <div className={headerStyles.contentWrapper}>
      { isTablet ? (
        <>
          <NavLink exact to="/">
            <MobileLogo />
          </NavLink>
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
              <NavLink exact to="/feed" className={headerStyles.link} activeClassName={headerStyles.linkActive}>
                <ListIcon type="secondary" />
                <span>Лента заказов</span>
              </NavLink>
            </nav>
            <NavLink exact to="/">
              <span className={headerStyles.logo}><Logo /></span>
            </NavLink>
            <NavLink exact to="/profile" className={headerStyles.button} activeClassName={headerStyles.linkActive} type="button">
              <ProfileIcon type="secondary" />
              <span>Личный кабинет</span>
            </NavLink>
          </>
        )}
    </div>
  </header>
);

export default AppHeader;
