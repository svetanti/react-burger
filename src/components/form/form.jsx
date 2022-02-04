import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';

function Form({ fields, buttonText }) {
  const [show, setShow] = useState(true);

  const icon = show ? 'ShowIcon' : 'HideIcon';

  return (
    <form className={styles.form}>
      { fields.map((el) => (
        <Input
          key={uuidv4()}
          type={el.name}
          name={el.name}
          placeholder={el.placeholder}
          icon={el.name === 'password' ? icon : undefined}
          onIconClick={() => setShow(!show)}
        />
      )) }
      <Button type="primary" size="medium">{buttonText}</Button>
    </form>
  );
}

Form.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default Form;
