import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './profile-menu.module.css';

function ProfileMenu({ onLogout }) {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <NavLink to="/profile" className={styles.link} activeClassName={styles.linkActive}>Профиль</NavLink>
        <NavLink to="/profile/orders" className={styles.link} activeClassName={styles.linkActive}>История заказов</NavLink>
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
