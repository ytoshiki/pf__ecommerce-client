import { CategoryDispatchTypes } from './dispatchTypes';
import { CategoryData } from './stateTypes';

interface FETCH_CATEGORIES {
  type: CategoryDispatchTypes.FETCH_CATEGORIES;
  payload: CategoryData[];
}

export type CategoryActions = FETCH_CATEGORIES;
