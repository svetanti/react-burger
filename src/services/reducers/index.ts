import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import ingredientsReducer from './ingredients-reducer';
import currentBurgerReducer from './current-burger-reducer';
import ingredientReducer from './ingredient-reducer';
import orderReducer from './order-reducer';

const rootReducer = combineReducers({
  ingredientsReducer,
  currentBurgerReducer,
  ingredientReducer,
  orderReducer,
  authReducer,
});

export default rootReducer;
