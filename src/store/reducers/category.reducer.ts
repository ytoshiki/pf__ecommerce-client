import { CategoryActions } from '../../types/store/categories/actionTypes';
import { CategoryDispatchTypes } from '../../types/store/categories/dispatchTypes';
import { CategoryState } from '../../types/store/categories/stateTypes';

const initialState = {
  categories: []
};

export const categoryReducer = (state: CategoryState = initialState, action: CategoryActions) => {
  switch (action.type) {
    case CategoryDispatchTypes.FETCH_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};
