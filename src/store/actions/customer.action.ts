import axios from 'axios';
import { CustomerDispatchTypes } from '../../types/store/customer/dispatchTypes';

interface CustomerApiResponse {
  username: string;
  _id: string;
  purchasesItems: any[];
}

export const dispatchLoginCustomer = (form: { username: string; password: string }) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}customers/register`, form);

      const data = await response.data;

      if (!data.success) {
        throw new Error(data.message);
      }

      const customer: CustomerApiResponse = data.customer;

      const customerReturned = {
        id: customer._id,
        username: customer.username,
        purchasedItems: customer.purchasesItems
      };

      dispatch({
        type: CustomerDispatchTypes.LOGIN_CUSTOMER,
        payload: customerReturned
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const dispatchLogoutCustomer = () => {
  return (dispatch: any) => {
    dispatch({
      type: CustomerDispatchTypes.LOGOUT_CUSTOMER
    });
  };
};

export const dispatchRegisterCustomer = (form: { username: string; email: string; password: string; age: number; gender: string; nat: string }) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}customers`, form);

      const data = await response.data;

      if (!data.success) {
        throw new Error(data.message);
      }

      const customer: CustomerApiResponse = data.newUser;

      const customerReturned = {
        id: customer._id,
        username: customer.username,
        purchasedItems: customer.purchasesItems
      };

      dispatch({
        type: CustomerDispatchTypes.REGISTER_CUSTOMER,
        payload: customerReturned
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
