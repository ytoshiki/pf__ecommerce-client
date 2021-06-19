import { OptionDispatchTypes } from '../../types/store/option/dispatchTypes';
import { store } from '../store';

export const dispatchOpenCart = () => {
  return (dispatch: any) => {
    const cart = store.getState().option.cart;

    document.body.classList.add('no-scroll');

    if (!cart) {
      dispatch({
        type: OptionDispatchTypes.OPEN_CART,
        payload: true
      });
    }
  };
};

export const dispatchCloseCart = () => {
  return (dispatch: any) => {
    document.body.classList.remove('no-scroll');
    const cart = store.getState().option.cart;
    if (cart) {
      dispatch({
        type: OptionDispatchTypes.CLOSE_CART,
        payload: false
      });
    }
  };
};

export const dispatchOpenSearch = () => {
  return (dispatch: any) => {
    document.body.classList.add('no-scroll');
    const search = store.getState().option.search;
    if (!search) {
      dispatch({
        type: OptionDispatchTypes.OPEN_SEARCH,
        payload: true
      });
    }
  };
};

export const dispatchCloseSearch = () => {
  return (dispatch: any) => {
    document.body.classList.remove('no-scroll');
    const search = store.getState().option.search;
    if (search) {
      dispatch({
        type: OptionDispatchTypes.CLOSE_SEARCH,
        payload: false
      });
    }
  };
};

export const dispatchOpenMenu = () => {
  return (dispatch: any) => {
    const menu = store.getState().option.menu;

    document.body.classList.add('no-scroll');

    if (!menu) {
      dispatch({
        type: OptionDispatchTypes.OPEN_MENU,
        payload: true
      });
    }
  };
};

export const dispatchCloseMenu = () => {
  return (dispatch: any) => {
    document.body.classList.remove('no-scroll');
    const menu = store.getState().option.menu;
    if (menu) {
      dispatch({
        type: OptionDispatchTypes.CLOSE__MENU,
        payload: false
      });
    }
  };
};
