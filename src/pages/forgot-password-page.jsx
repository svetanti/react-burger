import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login-page.module.css';
import AuthForm from '../components/auth-form/auth-form';
import { requestResetCode } from '../services/actions/auth-actions';

function ForgotPasswordPage() {
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const fields = [
    { name: 'email', type: 'email', placeholder: 'Укажите e-mail' },
  ];

  const [form, setValue] = useState({ email: '' });

  const handleChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRequestCode = (e) => {
    e.preventDefault();
    dispatch(requestResetCode(form.email));
    history.push('/reset-password');
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
      <h1 className={styles.title}>Восстановление пароля</h1>
      <AuthForm
        fields={fields}
        buttonText="Восстановить"
        form={form}
        onChange={handleChange}
        onClick={handleRequestCode}
      />
      <p className={styles.text}>
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
}

export default ForgotPasswordPage;
