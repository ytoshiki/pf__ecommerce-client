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
        cartItems: state.cartItems.concat(action.payload.cart),
        sum: state.sum + action.payload.total
      };
    case CartDispatchTypes.ADD_CART_ITEM_EXIST:
      return {
        ...state,
        cartItems: action.payload.cart,
        sum: action.payload.sum
      };
    case CartDispatchTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: action.payload.cart,
        sum: action.payload.sum
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
        cartItems: action.payload.cart,
        sum: action.payload.sum
      };
    case CartDispatchTypes.DECREASE_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: action.payload.cart,
        sum: action.payload.sum
      };
    case CartDispatchTypes.CLEAR_CART:
      return initialState;
    default:
      return state;
  }
};
