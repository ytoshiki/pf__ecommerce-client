import { combineReducers } from 'redux';
import { cartReducer } from './cart.reducer';
import { categoryReducer } from './category.reducer';

export const rootReducer = combineReducers({
  categories: categoryReducer,
  cart: cartReducer
});
