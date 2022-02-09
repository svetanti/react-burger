import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import AuthForm from '../components/auth-form/auth-form';
import { register } from '../services/actions/auth-actions';
import styles from './login-page.module.css';

function RegisterPage() {
  const { isAuth } = useSelector((store) => store.authReducer);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const fields = [
    { name: 'name', type: 'text', placeholder: 'Имя' },
    { name: 'email', type: 'email', placeholder: 'E-mail' },
    { name: 'password', type: 'password', placeholder: 'Пароль' },
  ];

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(register(form));
  };

  if (isAuth) {
    return (
      <Redirect to={state?.from || '/'} />
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Регистрация</h1>
      <AuthForm
        fields={fields}
        buttonText="Зарегистрироваться"
        form={form}
        onChange={handleChange}
        onSubmit={handleRegister}
      />
      <p className={styles.text}>
        Уже зарегистрированы?
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
