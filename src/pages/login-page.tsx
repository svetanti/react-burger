import React, { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../hooks';
import styles from './login-page.module.css';
import { login } from '../redux/actions/auth-actions';

const LoginPage = () => {
  const { isAuth } = useSelector((store) => store.authReducer);
  const { state } = useLocation() as any;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const icon = show ? 'ShowIcon' : 'HideIcon';
  const type = show ? 'text' : 'password';

  const toggleVisibility = () => {
    setShow(!show);
  };

  const [form, setValue] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(form));
  };

  if (isAuth) {
    return (
      <Redirect to={state?.from || '/'} />
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Вход</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        <Input
          type="email"
          name="email"
          value={form.email}
          placeholder="E-mail"
          onChange={handleChange}
        />
        <Input
          type={type}
          name="password"
          value={form.password}
          placeholder="Пароль"
          icon={icon}
          onChange={handleChange}
          onIconClick={toggleVisibility}
        />
        <Button type="primary" size="medium">Войти</Button>
      </form>
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
};

export default LoginPage;
