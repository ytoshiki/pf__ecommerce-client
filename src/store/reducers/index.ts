import { combineReducers } from 'redux';
import { cartReducer } from './cart.reducer';
import { categoryReducer } from './category.reducer';
import { customerReducer } from './customer.reducer';
import { optionReducer } from './option.reducer';

export const rootReducer = combineReducers({
  categories: categoryReducer,
  cart: cartReducer,
  customer: customerReducer,
  option: optionReducer
});
