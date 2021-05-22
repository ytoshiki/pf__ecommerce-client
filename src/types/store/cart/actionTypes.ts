import { CartDispatchTypes } from './dispatchTypes';
import { CartData } from './stateTypes';

interface FETCH_CART_ITEMS {
  type: CartDispatchTypes.FETCH_CART_ITEMS;
  payload: CartData[];
}

interface ADD_CART_ITEM {
  type: CartDispatchTypes.ADD_CART_ITEM;
  payload: CartData;
}

interface CALCULATE_SUM {
  type: CartDispatchTypes.CALCULATE_SUM;
  payload: number;
}

interface INCREASE_ITEM_QUANTITY {
  type: CartDispatchTypes.INCREASE_ITEM_QUANTITY;
  payload: CartData[];
}

interface DECREASE_ITEM_QUANTITY {
  type: CartDispatchTypes.DECREASE_ITEM_QUANTITY;
  payload: CartData[];
}

interface REMOVE_ITEM {
  type: CartDispatchTypes.REMOVE_ITEM;
  payload: CartData;
}

export type CartActions = FETCH_CART_ITEMS | CALCULATE_SUM | INCREASE_ITEM_QUANTITY | DECREASE_ITEM_QUANTITY | REMOVE_ITEM | ADD_CART_ITEM;
