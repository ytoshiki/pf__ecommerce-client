import { fas } from '@fortawesome/free-solid-svg-icons';
import { CategoryActions } from '../../types/store/categories/actionTypes';
import { CategoryDispatchTypes } from '../../types/store/categories/dispatchTypes';
import { CategoryState } from '../../types/store/categories/stateTypes';

const initialState = {
  categories: [],
  loading: false
};

export const categoryReducer = (state: CategoryState = initialState, action: CategoryActions) => {
  switch (action.type) {
    case CategoryDispatchTypes.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };
    case CategoryDispatchTypes.START_FETCHING_CATEGORIES:
      return {
        ...state,
        loading: action.payload
      };
    case CategoryDispatchTypes.STOP_FETCHING_CATEGORIES:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
