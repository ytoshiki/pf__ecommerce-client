import axios from 'axios';
import { useState } from 'react';
import { connect } from 'react-redux';
import Main from '../layouts/Main';
import SimpleModal from '../layouts/Modal';
import Section from '../layouts/Section';
import { dispatchClearCart, dispatchDecreaseQuantity, dispatchIncreaseQuantity, dispatchRemoveItem } from '../store/actions/cart.action';
import { CartState } from '../types/store/cart/stateTypes';
import { CustomerData } from '../types/store/customer/stateTypes';
import { storeTypes } from '../types/store/storeTypes';

export interface CheckoutPageProps {
  cart: CartState;
  dispatchIncrease: (id: string) => void;
  dispatchDecrease: (id: string) => void;
  dispatchRemove: (id: string) => void;
  customer: CustomerData;
  dispatchClear: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, dispatchIncrease, dispatchDecrease, dispatchRemove, customer, dispatchClear }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const purchaseItems = () => {
    if (!customer.id) {
      return setModalIsOpen(true);
    }

    const purchaseList: any[] = [];

    cart.cartItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        purchaseList.push({
          product: item.id,
          customer: customer.id
        });
      }
    });

    if (!purchaseList.length) {
      return;
    }

    const proceedPurchase = () => {
      purchaseList.forEach(async (item, index) => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}purchase`, item);
          const data = await response.data;
          if (!data.success) {
            throw new Error(data.message);
          }
        } catch (error) {
          console.log(error.message);
          return alert('Something went wrong');
        }
      });

      dispatchClear();
      alert('Thank you.');
    };

    proceedPurchase();
  };

  return (
    <Main>
      <SimpleModal isOpen={modalIsOpen} toggleOpen={setModalIsOpen} />
      <Section>
        {}
        <h1>Cart</h1>
        {cart.sum > 100 ? <p>You are eligible for free shipping</p> : <p>You need to purchase more than $100 for free shipping</p>}
        {cart.cartItems.length && (
          <>
            <ul>
              {cart.cartItems.map((item) => (
                <li key={item.id}>
                  <div>
                    <div>
                      <img src={item.images[0]} alt='' />
                    </div>
                    <div>
                      <div>
                        <span>{item.name}</span>
                        <span>{item.category}</span>
                        <span>{item.price}</span>
                      </div>
                      <div>
                        <div>
                          <span onClick={() => dispatchDecrease(item.id)}>-</span>
                          <span>{item.quantity}</span>
                          <span onClick={() => dispatchIncrease(item.id)}>+</span>
                        </div>
                        <button onClick={() => dispatchRemove(item.id)}>remove</button>
                      </div>
                      <div>
                        <div>{item.sum}</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {cart.sum}
            <button onClick={purchaseItems}>Checkout</button>
          </>
        )}
      </Section>
    </Main>
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    cart: store.cart,
    customer: store.customer
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchIncrease: (id: string) => dispatch(dispatchIncreaseQuantity(id)),
    dispatchDecrease: (id: string) => dispatch(dispatchDecreaseQuantity(id)),
    dispatchRemove: (id: string) => dispatch(dispatchRemoveItem(id)),
    dispatchClear: () => dispatch(dispatchClearCart())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
