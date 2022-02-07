import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch, useRouteMatch,
} from 'react-router-dom';
import ProfileForm from '../components/profile-form/profile-form';
import ProfileMenu from '../components/profile-menu/profile-menu';
import { getUser, logout, updateUser } from '../services/actions/auth-actions';
import styles from './profile-page.module.css';

function ProfilePage() {
  const dispatch = useDispatch();
  const { path } = useRouteMatch();
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const [buttonsVisible, setButtonsVisible] = useState(false);

  const { user } = useSelector((store) => store.authReducer);

  useEffect(() => {
    dispatch(getUser());
    setValue({ ...user, password: '' });
  }, []);

  const handleChange = (e) => {
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

  const handleUserUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  return (
    <div className={styles.wrapper}>
      <ProfileMenu onLogout={handleLogout} />
      <Router>
        <Switch>
          <Route exact path={`${path}`}>
            <ProfileForm
              form={form}
              onChange={handleChange}
              onClick={handleUserUpdate}
              onReset={handleReset}
              buttonsVisible={buttonsVisible}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default ProfilePage;
