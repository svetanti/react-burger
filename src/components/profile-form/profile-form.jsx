import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.css';

function ProfileForm({
  form, onChange, onSubmit, onReset, buttonsVisible,
}) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        type="text"
        name="name"
        value={form.name}
        placeholder="Имя"
        icon="EditIcon"
        onChange={onChange}
      />
      <Input
        type="email"
        name="email"
        value={form.email}
        placeholder="Логин"
        icon="EditIcon"
        onChange={onChange}
      />
      <Input
        type="password"
        name="password"
        value={form.password}
        placeholder="Пароль"
        icon="EditIcon"
        onChange={onChange}
      />
      { buttonsVisible && (
        <div className={styles.buttonsWrapper}>
          <button type="button" className={styles.resetButton} onClick={onReset}>Отмена</button>
          <Button>Сохранить</Button>
        </div>
      )}
    </form>
  );
}

ProfileForm.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  buttonsVisible: PropTypes.bool.isRequired,
};

export default ProfileForm;
