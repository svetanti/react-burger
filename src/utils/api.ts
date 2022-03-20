import { API_URL } from '../constants/constants';
import { TIngredient, TProfileForm } from '../types/types';
import { getCookie, makeRequest } from './utils';

export const sendOrder = (data: Array<TIngredient>) => makeRequest(`${API_URL}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getCookie('token')}`,
  },
  body: JSON.stringify({ ingredients: data }),
})
  .then((response) => response.order);

export const getIngredients = () => makeRequest(`${API_URL}/ingredients`);

export const register = (data: {name: string; email: string; password: string }) => makeRequest(`${API_URL}/auth/register`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});

export const signIn = (data: { email: string; password: string }) => makeRequest(`${API_URL}/auth/login`, {
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

export const updateUserInfo = (data: TProfileForm) => makeRequest(`${API_URL}/auth/user`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${getCookie('token')}`,
  },
  body: JSON.stringify(data),
});

export const requestCode = (email: {email: string}) => makeRequest(`${API_URL}/password-reset`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email }),
});

export const resetPass = (data: { 'password': string; 'token': string}) => makeRequest(`${API_URL}/password-reset/reset`, {
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
