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
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  headers: THeaders
  body?: string,
};
