import API_URL from '../constants/constants';

export const sendOrder = (data) => fetch(`${API_URL}/orders`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
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
