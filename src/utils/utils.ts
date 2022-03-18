import { DAYS_DECL } from '../constants/constants';
import { TIngredient, TrequestOptions } from '../types/types';

export function on<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['addEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
  }
}

export function off<T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T['removeEventListener']> | [string, Function | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
  }
}

export const isBrowser = typeof window !== 'undefined';

/* eslint-disable no-multi-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
export function setCookie(name: string, value: string, props: any) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp === 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = `${name}=${value}`;
  for (const propName in props) {
    updatedCookie += `; ${propName}`;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += `=${propValue}`;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const makeRequest = (url: string, oprions?: TrequestOptions) => fetch(url, oprions)
  .then((res) => {
    if (!res.ok) {
      return res.json()
        .then((err) => {
          throw new Error(err.message);
        });
    }
    return res.json();
  });

const declOfNum = (number: number, words: Array<string>) => words[
  (number % 100 > 4 && number % 100 < 20)
    ? 2
    : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

export const formatDate = (date: string) => {
  const now = Date.now();
  const createdAt = Date.parse(date);
  const delta = (now - createdAt) / (24 * 60 * 60 * 1000);
  if (delta < 1) {
    return `Сегодня, ${date.slice(11, 16)} i-GMT+3`;
  } if (delta < 2 && delta > 1) {
    return `Вчера, ${date.slice(11, 16)} i-GMT+3`;
  }
  return `${Math.floor(delta)} ${declOfNum(Math.floor(delta), DAYS_DECL)} назад, ${date.slice(11, 16)} i-GMT+3`;
};

export const countDuplicates = (arr: Array<TIngredient>): Array<TIngredient> => {
  const res = {} as any;
  arr.forEach((obj) => {
    const key = `${obj._id}`;
    if (!res[key]) {
      res[key] = { ...obj, count: 0 };
    }
    res[key].count += 1;
  });
  return Object.values(res);
};

export const formatStatus = (status: string): string => {
  if (status === 'done') {
    return 'Выполнен';
  } if (status === 'pending') {
    return 'Готовится';
  } return 'Создан';
};
