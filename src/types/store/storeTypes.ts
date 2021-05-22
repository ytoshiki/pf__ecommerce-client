import { CartState } from './cart/stateTypes';
import { CategoryState } from './categories/stateTypes';

export interface storeTypes {
  categories: CategoryState[];
  cart: CartState
}
