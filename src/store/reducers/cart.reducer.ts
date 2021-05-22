import { CartState } from '../../types/store/cart/stateTypes';
import { CartActions } from '../../types/store/cart/actionTypes';
import { CartDispatchTypes } from '../../types/store/cart/dispatchTypes';

const initialState = {
  cartItems: [],
  sum: 0
};

export const cartReducer = (state: CartState = initialState, action: CartActions) => {
  switch (action.type) {
    case CartDispatchTypes.FETCH_CART_ITEMS:
      return {
        ...state,
        cartItems: action.payload
      };
    case CartDispatchTypes.ADD_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.concat(action.payload)
      };
    case CartDispatchTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id)
      };
    case CartDispatchTypes.CALCULATE_SUM: {
      return {
        ...state,
        sum: action.payload
      };
    }
    case CartDispatchTypes.INCREASE_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: action.payload
      };
    case CartDispatchTypes.DECREASE_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: action.payload
      };
    default:
      return state;
  }
};
