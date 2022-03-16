export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string
  count?: number
};

type TOrderOwner = {
  name: string;
  email: string;
  createdAt: string
};

export type TOrder = {
  createdAt: string;
  ingredients: Array<TIngredient | string>;
  name: string;
  number: number
  owner: TOrderOwner;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TOrderResponse = {
  name: string;
  order: TOrder;
  success: boolean;
};

export type TLastOrders = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TProfileForm = {
  name: string;
  email: string;
  password: string;
};

export type TLocationState = {
  from?: string;
  background?: {
    hash: string;
    key?: string;
    pathname: string;
    search: string;
    state: TLocationState;
  };
};

export type TLocation = {
  hash: string;
  key?: string;
  pathname: string;
  search: string;
  state: TLocationState;
};

type THeaders = {
  'Content-Type': string;
  Authorization?: string;
};

export type TrequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  headers: THeaders;
  body?: string;
};

export type TUser = {
  name: string;
  email: string;
};
