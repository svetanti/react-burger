import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login-page.module.css';
import Form from '../components/form/form';

function LoginPage() {
  const fields = [
    { name: 'email', placeholder: 'E-mail' },
    { name: 'password', placeholder: 'Пароль' },
  ];
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Вход</h1>
      <Form
        fields={fields}
        buttonText="Войти"
      />
      <p className={styles.text}>
        Вы — новый пользователь?
        <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
      </p>
      <p className={styles.text}>
        Забыли пароль?
        <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
      </p>
    </div>
  );
}

export default LoginPage;
