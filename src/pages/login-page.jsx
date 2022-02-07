/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login-page.module.css';
import AuthForm from '../components/auth-form/auth-form';
import { login } from '../services/actions/auth-actions';

function LoginPage() {
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const fields = [
    { name: 'email', type: 'email', placeholder: 'E-mail' },
    { name: 'password', type: 'password', placeholder: 'Пароль' },
  ];

  const [form, setValue] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  if (isAuth) {
    return (
      <Redirect to={{
        pathname: '/',
      }}
      />
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Вход</h1>
      <AuthForm
        fields={fields}
        buttonText="Войти"
        form={form}
        onChange={handleChange}
        onClick={handleLogin}
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
