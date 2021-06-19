import { OptionState } from '../../types/store/option/stateTypes';
import { OptionActions } from '../../types/store/option/actionTypes';
import { OptionDispatchTypes } from '../../types/store/option/dispatchTypes';

const initialState = {
  cart: false,
  search: false,
  menu: false
};

export const optionReducer = (state: OptionState = initialState, action: OptionActions) => {
  switch (action.type) {
    case OptionDispatchTypes.OPEN_CART:
      return {
        ...state,
        cart: action.payload
      };
    case OptionDispatchTypes.OPEN_SEARCH:
      return {
        ...state,
        search: action.payload
      };
    case OptionDispatchTypes.OPEN_MENU:
      return {
        ...state,
        menu: action.payload
      };
    case OptionDispatchTypes.CLOSE_CART:
      return {
        ...state,
        cart: action.payload
      };
    case OptionDispatchTypes.CLOSE_SEARCH:
      return {
        ...state,
        search: action.payload
      };
    case OptionDispatchTypes.CLOSE__MENU:
      return {
        ...state,
        menu: action.payload
      };
    default:
      return state;
  }
};
