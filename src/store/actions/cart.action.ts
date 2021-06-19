import axios from 'axios';
import { ProductApiTypes } from '../../types/api/ProductApiTypes';
import { CartDispatchTypes } from '../../types/store/cart/dispatchTypes';
import { CartData } from '../../types/store/cart/stateTypes';
import { OptionDispatchTypes } from '../../types/store/option/dispatchTypes';
import { store } from '../store';

export const dispatchFetchCartItems = () => {
  return (dispatch: any) => {
    const storedCartItems = localStorage.getItem(`${process.env.REACT_APP_LOCAL_KEY}`);
    if (!storedCartItems) return false;

    dispatch({
      type: CartDispatchTypes.FETCH_CART_ITEMS,
      payload: storedCartItems
    });

    return true;
  };
};

export const dispatchAddCartItem = (id: string, quantity: number) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}products/${id}`);
      const data = await response.data;

      if (!data.success) {
        throw new Error(data.message || 'Item Not Found');
      }

      const product: ProductApiTypes = data.product;

      const alreadyExist = store.getState().cart.cartItems.find((item) => {
        return item.id === product._id;
      });

      if (alreadyExist as CartData) {
        const priceIncreased = (alreadyExist?.price as number) * quantity;
        const newCart = {
          ...alreadyExist,
          quantity: (alreadyExist?.quantity as number) + quantity,
          sum: Math.floor(((alreadyExist?.sum as number) + priceIncreased) * Math.pow(10, 2)) / Math.pow(10, 2)
        };

        const totalSum = store.getState().cart.sum + priceIncreased;

        const newTotalSum = Math.floor(totalSum * Math.pow(10, 2)) / Math.pow(10, 2);

        const newCartItems = store.getState().cart.cartItems.map((cart) => {
          if (cart.id === newCart.id) {
            return newCart;
          }

          return cart;
        });

        //
        const cart = store.getState().option.cart;

        if (!cart) {
          document.body.classList.add('no-scroll');

          dispatch({
            type: OptionDispatchTypes.OPEN_CART,
            payload: true
          });
        }

        //

        return dispatch({
          type: CartDispatchTypes.ADD_CART_ITEM_EXIST,
          payload: {
            cart: newCartItems,
            sum: newTotalSum
          }
        });
      }

      const productReturned = {
        id: product._id,
        name: product.name,
        images: product.images,
        category: product.category.name ? product.category.name : '',
        price: product.price,
        sum: Math.floor(product.price * quantity * Math.pow(10, 2)) / Math.pow(10, 2),
        quantity
      };

      //
      const cart = store.getState().option.cart;

      if (!cart) {
        document.body.classList.add('no-scroll');

        dispatch({
          type: OptionDispatchTypes.OPEN_CART,
          payload: true
        });
      }

      //

      dispatch({
        type: CartDispatchTypes.ADD_CART_ITEM,
        payload: {
          cart: productReturned,
          total: Math.floor(productReturned.sum * Math.pow(10, 2)) / Math.pow(10, 2)
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const dispatchIncreaseQuantity = (id: string) => {
  return (dispatch: any) => {
    const items = store.getState().cart.cartItems.map((item) => {
      if (item.id === id) {
        item.quantity++;
        item.sum = Math.floor((item.sum + item.price) * Math.pow(10, 2)) / Math.pow(10, 2);
      }

      return item;
    });

    const sum = items.reduce((sum, item) => sum + item.sum, 0);

    dispatch({
      type: CartDispatchTypes.INCREASE_ITEM_QUANTITY,
      payload: {
        cart: items,
        sum: Math.floor(sum * Math.pow(10, 2)) / Math.pow(10, 2)
      }
    });
  };
};

export const dispatchDecreaseQuantity = (id: string) => {
  return (dispatch: any) => {
    let changed = false;

    const items = store.getState().cart.cartItems.map((item) => {
      if (item.id === id && item.quantity > 1) {
        item.quantity--;
        item.sum = Math.floor((item.sum - item.price) * Math.pow(10, 2)) / Math.pow(10, 2);
        changed = true;
      }

      return item;
    });

    if (!changed) return;

    const sum = items.reduce((sum, item) => sum + item.sum, 0);

    dispatch({
      type: CartDispatchTypes.DECREASE_ITEM_QUANTITY,
      payload: {
        cart: items,
        sum: Math.floor(sum * Math.pow(10, 2)) / Math.pow(10, 2)
      }
    });
  };
};

export const dispatchRemoveItem = (id: string) => {
  return (dispatch: any) => {
    const items = store.getState().cart.cartItems;

    const filteredItems = items.filter((item) => {
      return item.id !== id;
    });

    const sum = filteredItems.reduce((sum, item) => sum + item.sum, 0);

    dispatch({
      type: CartDispatchTypes.INCREASE_ITEM_QUANTITY,
      payload: {
        cart: filteredItems,
        sum: Math.floor(sum * Math.pow(10, 2)) / Math.pow(10, 2)
      }
    });
  };
};

export const dispatchClearCart = () => {
  return (dispatch: any) => {
    dispatch({
      type: CartDispatchTypes.CLEAR_CART
    });
  };
};
