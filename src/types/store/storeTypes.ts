import { CartState } from './cart/stateTypes';
import { CategoryState } from './categories/stateTypes';
import { CustomerData } from './customer/stateTypes';
import { OptionData } from './option/stateTypes';

export interface storeTypes {
  categories: CategoryState;
  cart: CartState;
  customer: CustomerData;
  option: OptionData;
}
