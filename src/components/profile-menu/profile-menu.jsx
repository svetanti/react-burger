import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';
import styles from './profile-menu.module.css';

function ProfileMenu({ onLogout }) {
  const { url } = useRouteMatch();
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <NavLink exact to={`${url}`} className={styles.link} activeClassName={styles.linkActive}>Профиль</NavLink>
        <NavLink to={`${url}/orders`} className={styles.link} activeClassName={styles.linkActive}>История заказов</NavLink>
        <button
          type="button"
          className={styles.link}
          onClick={onLogout}
        >
          Выход

        </button>
      </nav>
      <p className={styles.text}>
        В этом разделе вы можете
        изменить свои персональные данные
      </p>
    </div>
  );
}

ProfileMenu.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default ProfileMenu;
