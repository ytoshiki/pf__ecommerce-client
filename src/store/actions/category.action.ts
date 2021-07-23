import axios from 'axios';
import { CategoryDispatchTypes } from '../../types/store/categories/dispatchTypes';

interface CategoryResponse {
  paragraph: null | string;
  products: string[];
  _id: string;
  name: string;
  image: string;
}

export const dispatchfetchCategories = () => {
  return async (dispatch: any) => {
    dispatch({
      type: CategoryDispatchTypes.START_FETCHING_CATEGORIES,
      payload: true
    });

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}categories`);
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message);
      }

      const categories: CategoryResponse[] = data.categories;

      if (!categories || categories.length === 0) {
        throw new Error('No categories found');
      }

      const categories_payload = categories.map((category) => ({
        id: category._id,
        paragraph: category.paragraph,
        products: category.products,
        name: category.name,
        image: category.image
      }));

      dispatch({
        type: CategoryDispatchTypes.FETCH_CATEGORIES,
        payload: categories_payload
      });

      return categories_payload;
    } catch (error) {
      dispatch({
        type: CategoryDispatchTypes.STOP_FETCHING_CATEGORIES,
        payload: false
      });
      console.log(error.message);
    }
  };
};
