import { combineReducers } from 'redux';
import { ingredientsReducer } from './reducers';

const rootReducer = combineReducers({
  ingredientsReducer,
});

export default rootReducer;
