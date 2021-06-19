import { CartDispatchTypes } from './dispatchTypes';
import { CartData } from './stateTypes';

interface FETCH_CART_ITEMS {
  type: CartDispatchTypes.FETCH_CART_ITEMS;
  payload: CartData[];
}

interface ADD_CART_ITEM {
  type: CartDispatchTypes.ADD_CART_ITEM;
  payload: {
    cart: CartData;
    total: number;
  };
}

interface ADD_CART_ITEM_EXIST {
  type: CartDispatchTypes.ADD_CART_ITEM_EXIST;
  payload: {
    cart: CartData[];
    sum: number;
  };
}

interface CALCULATE_SUM {
  type: CartDispatchTypes.CALCULATE_SUM;
  payload: number;
}

interface INCREASE_ITEM_QUANTITY {
  type: CartDispatchTypes.INCREASE_ITEM_QUANTITY;
  payload: {
    cart: CartData[];
    sum: number;
  };
}

interface DECREASE_ITEM_QUANTITY {
  type: CartDispatchTypes.DECREASE_ITEM_QUANTITY;
  payload: {
    cart: CartData[];
    sum: number;
  };
}

interface REMOVE_ITEM {
  type: CartDispatchTypes.REMOVE_ITEM;
  payload: {
    cart: CartData[];
    sum: number;
  };
}

interface CLEAR_CART {
  type: CartDispatchTypes.CLEAR_CART;
}

export type CartActions = FETCH_CART_ITEMS | CALCULATE_SUM | INCREASE_ITEM_QUANTITY | DECREASE_ITEM_QUANTITY | REMOVE_ITEM | ADD_CART_ITEM | CLEAR_CART | ADD_CART_ITEM_EXIST;
