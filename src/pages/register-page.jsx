import React from 'react';
import { Link } from 'react-router-dom';
import Form from '../components/form/form';
import styles from './login-page.module.css';

function RegisterPage() {
  const fields = [
    { name: 'name', placeholder: 'Имя' },
    { name: 'email', placeholder: 'E-mail' },
    { name: 'password', placeholder: 'Пароль' },
  ];
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Регистрация</h1>
      <Form
        fields={fields}
        buttonText="Зарегистрироваться"
      />
      <p className={styles.text}>
        Уже зарегистрированы?
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
