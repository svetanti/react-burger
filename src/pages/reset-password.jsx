import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import AuthForm from '../components/auth-form/auth-form';
import { resetPassword } from '../services/actions/auth-actions';
import styles from './login-page.module.css';

function ResetPasswordPage() {
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const prevPathname = history.location.state?.prevPathname;
  const fields = [
    { name: 'password', type: 'password', placeholder: 'Введите новый пароль' },
    { name: 'token', type: 'text', placeholder: 'Введите код из письма' },
  ];

  const [form, setValue] = useState({ password: '', token: '' });

  const handleChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(form));
    history.push('/login');
  };

  if (!prevPathname) {
    return (
      <Redirect to={{
        pathname: '/login',
      }}
      />
    );
  }

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
      <h1 className={styles.title}>Восстановление пароля</h1>
      <AuthForm
        fields={fields}
        buttonText="Сохранить"
        form={form}
        onChange={handleChange}
        onClick={handleResetPassword}
      />
      <p className={styles.text}>
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default ResetPasswordPage;
