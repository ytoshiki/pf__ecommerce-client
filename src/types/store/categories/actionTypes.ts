import { CategoryDispatchTypes } from './dispatchTypes';
import { CategoryData } from './stateTypes';

interface FETCH_CATEGORIES {
  type: CategoryDispatchTypes.FETCH_CATEGORIES;
  payload: CategoryData[];
}

interface START_FEACHING_CATEGORIES {
  type: CategoryDispatchTypes.START_FETCHING_CATEGORIES;
  payload: boolean;
}

interface STOP_FEACHING_CATEGORIES {
  type: CategoryDispatchTypes.STOP_FETCHING_CATEGORIES;
  payload: boolean;
}

export type CategoryActions = FETCH_CATEGORIES | START_FEACHING_CATEGORIES | STOP_FEACHING_CATEGORIES;
