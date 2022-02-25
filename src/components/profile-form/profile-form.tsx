import React, { FC } from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile-form.module.css';
import { TProfileForm } from '../../types/types';

type TProfileFormProps = {
  form: TProfileForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  onReset: () => void;
  buttonsVisible: boolean
};

const ProfileForm:FC<TProfileFormProps> = ({
  form, onChange, onSubmit, onReset, buttonsVisible,
}) => (
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

export default ProfileForm;
