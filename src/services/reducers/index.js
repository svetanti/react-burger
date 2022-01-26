import { combineReducers } from 'redux';
import {
  currentBurgerReducer, ingredientsReducer, ingredientReducer, orderReducer, modalReducer,
} from './reducers';

const rootReducer = combineReducers({
  ingredientsReducer,
  currentBurgerReducer,
  ingredientReducer,
  orderReducer,
  modalReducer,
});

export default rootReducer;
