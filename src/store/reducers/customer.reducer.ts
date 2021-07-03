import { CustomerActions } from '../../types/store/customer/actionTypes';
import { CustomerDispatchTypes } from '../../types/store/customer/dispatchTypes';
import { CustomerState } from '../../types/store/customer/stateTypes';

const initialState = JSON.parse(window.localStorage.getItem('w_user') as any) || {
  id: '',
  username: '',
  purchasedItems: [],
  token: null
};

export const customerReducer = (state: CustomerState = initialState, action: CustomerActions) => {
  switch (action.type) {
    case CustomerDispatchTypes.LOGIN_CUSTOMER:
      return action.payload;
    case CustomerDispatchTypes.REGISTER_CUSTOMER:
      return action.payload;
    case CustomerDispatchTypes.LOGOUT_CUSTOMER:
      return initialState;
    default:
      return state;
  }
};
