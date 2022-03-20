import React, { useEffect, useState } from 'react';
import {
  Route, Switch, useRouteMatch,
} from 'react-router-dom';
import { useDispatch, useSelector } from '../hooks';
import Orders from '../components/orders/orders';
import ProfileForm from '../components/profile-form/profile-form';
import ProfileMenu from '../components/profile-menu/profile-menu';
import { logout, updateUser } from '../redux/actions/auth-actions';
import styles from './profile-page.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const { user } = useSelector((store) => store.authReducer);

  useEffect(() => {
    setValue({ ...user, password: '' });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    setButtonsVisible(true);
  };

  const handleReset = () => {
    setValue({ ...user, password: '' });
    setButtonsVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUserUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  return (
    <div className={styles.wrapper}>
      <ProfileMenu onLogout={handleLogout} />
      <Switch>
        <Route path={`${path}/orders`}>
          <Orders />
        </Route>
        <Route exact path={`${path}`}>
          <ProfileForm
            form={form}
            onChange={handleChange}
            onSubmit={handleUserUpdate}
            onReset={handleReset}
            buttonsVisible={buttonsVisible}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default ProfilePage;
