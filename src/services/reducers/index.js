import { combineReducers } from 'redux';
import {
  currentBurgerReducer, ingredientsReducer, ingredientReducer, orderReducer, modalReducer,
} from './reducers';
import authReducer from './auth-reducer';

const rootReducer = combineReducers({
  ingredientsReducer,
  currentBurgerReducer,
  ingredientReducer,
  orderReducer,
  modalReducer,
  authReducer,
});

export default rootReducer;
