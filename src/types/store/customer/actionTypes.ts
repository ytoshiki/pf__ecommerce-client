import { CustomerDispatchTypes } from './dispatchTypes';
import { CustomerData } from './stateTypes';

interface LOGIN_CUSTOMER {
  type: CustomerDispatchTypes.LOGIN_CUSTOMER;
  payload: CustomerData;
}

interface LOGOUT_CUSTOMER {
  type: CustomerDispatchTypes.LOGOUT_CUSTOMER;
}

interface REGISTER_CUSTOMER {
  type: CustomerDispatchTypes.REGISTER_CUSTOMER;
  payload: CustomerData;
}

interface ADD_PURCHASEITEM {
  type: CustomerDispatchTypes.ADD_PURCHASEITEM;
  payload: string;
}

interface UPDATE_STATUS_CUSTOMER {
  type: CustomerDispatchTypes.UPDATE_STATUS_CUSTOMER;
  payload: CustomerData;
}

export type CustomerActions = LOGIN_CUSTOMER | LOGOUT_CUSTOMER | REGISTER_CUSTOMER | ADD_PURCHASEITEM | UPDATE_STATUS_CUSTOMER;
