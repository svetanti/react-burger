import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './auth-form.module.css';

function AuthForm({
  fields, buttonText, form, onChange, onClick,
}) {
  const [show, setShow] = useState(false);

  const icon = show ? 'ShowIcon' : 'HideIcon';
  const type = show ? 'text' : 'password';

  const toggleVisibility = () => {
    setShow(!show);
  };

  return (
    <form className={styles.form}>
      { fields.map((el) => (
        <Input
          key={`${el.name}`}
          type={el.name === 'password' ? type : el.type}
          name={el.name}
          value={form[el.name]}
          placeholder={el.placeholder}
          icon={el.name === 'password' ? icon : undefined}
          onChange={onChange}
          onIconClick={toggleVisibility}
        />
      )) }
      <Button type="primary" size="medium" onClick={onClick}>{buttonText}</Button>
    </form>
  );
}

AuthForm.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  buttonText: PropTypes.string.isRequired,
  form: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AuthForm;
