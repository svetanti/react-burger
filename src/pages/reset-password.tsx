import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../hooks';
import { resetPassword } from '../services/actions/auth-actions';
import styles from './login-page.module.css';

const ResetPasswordPage = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory() as any;
  const prevPathname = history.location.state?.prevPathname;
  const [show, setShow] = useState(false);
  const [form, setValue] = useState({ password: '', token: '' });

  const icon = show ? 'ShowIcon' : 'HideIcon';
  const type = show ? 'text' : 'password';

  const toggleVisibility = () => {
    setShow(!show);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
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
      <form className={styles.form} onSubmit={handleResetPassword}>
        <Input
          type={type}
          name="token"
          value={form.password}
          placeholder="Введите новый пароль"
          icon={icon}
          onIconClick={toggleVisibility}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="password"
          value={form.password}
          placeholder="Введите код из письма"
          onChange={handleChange}
        />
        <Button type="primary" size="medium">Сохранить</Button>
      </form>
      <p className={styles.text}>
        Вспомнили пароль?
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
