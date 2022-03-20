import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../hooks';
import styles from './login-page.module.css';
import { requestResetCode } from '../redux/actions/auth-actions';

const ForgotPasswordPage = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setValue] = useState({ email: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleRequestCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(requestResetCode(form.email));
    history.push({ pathname: '/reset-password', state: { prevPathname: history.location.pathname } });
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
      <form className={styles.form} onSubmit={handleRequestCode}>
        <Input
          type="email"
          name="email"
          value={form.email}
          placeholder="Укажите e-mail"
          onChange={handleChange}
        />
        <Button type="primary" size="medium">Восстановить</Button>
      </form>
      <p className={styles.text}>
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
