import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/form/form';
import styles from './login-page.module.css';

function ResetPasswordPage() {
  const fields = [
    { name: 'password', placeholder: 'Введите новый пароль' },
    { name: 'text', placeholder: 'Введите код из письма' },
  ];
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <Form
        fields={fields}
        buttonText="Сохранить"
      />
      <p className={styles.text}>
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;
