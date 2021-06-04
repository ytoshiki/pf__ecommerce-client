import { OptionDispatchTypes } from './dispatchTypes';

interface OPEN_CART {
  type: OptionDispatchTypes.OPEN_CART;
  payload: boolean;
}

interface OPEN_SEARCH {
  type: OptionDispatchTypes.OPEN_SEARCH;
  payload: boolean;
}

interface CLOSE_CART {
  type: OptionDispatchTypes.CLOSE_CART;
  payload: boolean;
}

interface CLOSE_SEARCH {
  type: OptionDispatchTypes.CLOSE_SEARCH;
  payload: boolean;
}

export type OptionActions = OPEN_CART | OPEN_SEARCH | CLOSE_CART | CLOSE_SEARCH;
