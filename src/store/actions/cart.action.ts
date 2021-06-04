import axios from 'axios';
import { ProductApiTypes } from '../../types/api/ProductApiTypes';
import { CartDispatchTypes } from '../../types/store/cart/dispatchTypes';
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

      const productReturned = {
        id: product._id,
        name: product.name,
        images: product.images,
        category: product.category.name || '',
        price: product.price,
        sum: product.price * quantity,
        quantity
      };

      dispatch({
        type: CartDispatchTypes.ADD_CART_ITEM,
        payload: {
          cart: productReturned,
          total: productReturned.sum
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
        item.sum = item.sum + item.price;
      }

      return item;
    });

    const sum = items.reduce((sum, item) => sum + item.sum, 0);

    dispatch({
      type: CartDispatchTypes.INCREASE_ITEM_QUANTITY,
      payload: {
        cart: items,
        sum
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
        item.sum = item.sum - item.price;
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
        sum
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
        sum
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
