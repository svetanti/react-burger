import API_URL from '../constants/constants';
import { getCookie, makeRequest } from './utils';

export const sendOrder = (data) => fetch(`${API_URL}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getCookie('token')}`,
  },
  body: JSON.stringify({ ingredients: data }),
})
  .then((res) => {
    if (!res.ok) {
      return res.json()
        .then((err) => {
          throw new Error(err.message);
        });
    }
    return res.json();
  })
  .then((response) => response.order);

export const getIngredients = () => fetch(`${API_URL}/ingredients`).then((res) => {
  if (!res.ok) {
    return res.json()
      .then((err) => {
        throw new Error(err.message);
      });
  }
  return res.json();
});

export const register = (data) => fetch(`${API_URL}/auth/register`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
  .then((res) => {
    if (!res.ok) {
      return res.json()
        .then((err) => {
          throw new Error(err.message);
        });
    }
    return res.json();
  });

export const signIn = (data) => makeRequest(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

export const signOut = () => makeRequest(`${API_URL}/auth/logout`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token: localStorage.getItem('jwt') }),
});

export const getUserInfo = () => makeRequest(`${API_URL}/auth/user`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getCookie('token')}`,
  },
});

export const updateUserInfo = (data) => makeRequest(`${API_URL}/auth/user`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getCookie('token')}`,
  },
  body: JSON.stringify(data),
});

export const requestCode = (email) => makeRequest(`${API_URL}/password-reset`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email }),
});

export const resetPass = (data) => makeRequest(`${API_URL}/password-reset/reset`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

export const updateToken = () => makeRequest(`${API_URL}/auth/token`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ token: localStorage.getItem('jwt') }),
});
