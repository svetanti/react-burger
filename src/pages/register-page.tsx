import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { register } from '../services/actions/auth-actions';
import { TRootState } from '../services/reducers';
import styles from './login-page.module.css';

const RegisterPage = () => {
  const { isAuth } = useSelector((store: TRootState) => store.authReducer);
  const { state } = useLocation() as any;
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const icon = show ? 'ShowIcon' : 'HideIcon';
  const type = show ? 'text' : 'password';

  const toggleVisibility = () => {
    setShow(!show);
  };

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
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
      <form className={styles.form} onSubmit={handleRegister}>
        <Input
          type="text"
          name="name"
          value={form.name}
          placeholder="Имя"
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          value={form.email}
          placeholder="Пароль"
          onChange={handleChange}
        />
        <Input
          type={type}
          name="password"
          value={form.password}
          placeholder="Пароль"
          icon={icon}
          onIconClick={toggleVisibility}
          onChange={handleChange}
        />
        <Button type="primary" size="medium">Зарегистрироваться</Button>
      </form>
      <p className={styles.text}>
        Уже зарегистрированы?
        <Link to="/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
