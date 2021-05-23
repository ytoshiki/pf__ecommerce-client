import axios from 'axios';
import { ProductApiTypes } from '../../types/api/ProductApiTypes';
import { CartDispatchTypes } from '../../types/store/cart/dispatchTypes';

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

export const dispatchAddCartItem = (id: string) => {
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
        quantity: 1
      };

      dispatch({
        type: CartDispatchTypes.ADD_CART_ITEM,
        payload: productReturned
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
