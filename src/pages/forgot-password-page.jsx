import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login-page.module.css';
import Form from '../components/form/form';

function ForgotPasswordPage() {
  const fields = [
    { name: 'email', placeholder: 'Укажите e-mail' },
  ];
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Восстановление пароля</h1>
      <Form
        fields={fields}
        buttonText="Восстановить"
      />
      <p className={styles.text}>
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
