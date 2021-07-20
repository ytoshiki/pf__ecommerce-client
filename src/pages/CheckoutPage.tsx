import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Main from '../layouts/Main';
import SimpleModal from '../layouts/Modal';
import Section from '../layouts/Section';
import { dispatchClearCart, dispatchDecreaseQuantity, dispatchIncreaseQuantity, dispatchRemoveItem } from '../store/actions/cart.action';
import { CartState } from '../types/store/cart/stateTypes';
import { CustomerData } from '../types/store/customer/stateTypes';
import { storeTypes } from '../types/store/storeTypes';
import '../styles/pages/Checkout.scss';
import Footer from '../layouts/Footer';
import { updateUserStatus } from '../store/actions/customer.action';

export interface CheckoutPageProps {
  cart: CartState;
  dispatchIncrease: (id: string) => void;
  dispatchDecrease: (id: string) => void;
  dispatchRemove: (id: string) => void;
  customer: CustomerData;
  dispatchClear: () => void;
  updateUserStatus: (id: string) => boolean;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, dispatchIncrease, dispatchDecrease, dispatchRemove, customer, dispatchClear, updateUserStatus }) => {
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

    const proceedPurchase = async () => {
      async function asyncForEach(array: any[], callback: (item: any) => any) {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index]);
        }
      }

      await asyncForEach(purchaseList, async (item) => {
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

      const updateSuccess = updateUserStatus(customer.id);

      if (!updateSuccess) console.error('Something went wrong');

      alert('Thank you.');
    };

    proceedPurchase();
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const navigation = document.querySelector('.l-navigation');
      if (navigation) {
        navigation.classList.add('is-scroll');
      }
    }

    return () => {
      mounted = false;
      const navigation = document.querySelector('.l-navigation');
      if (navigation) {
        navigation.classList.remove('is-scroll');
      }
    };
  }, []);

  return (
    <Main>
      <SimpleModal isOpen={modalIsOpen} toggleOpen={setModalIsOpen} />
      <Section>
        {}
        <div className='c-checkout'>
          <div className='c-checkout__heading'>
            <h1>Cart</h1>
            {cart.sum > 100 ? <p>You are eligible for free shipping</p> : <p>You need to purchase more than $100 for free shipping</p>}
          </div>
          {cart.cartItems.length > 0 && (
            <>
              <ul className='c-checkout__list'>
                {cart.cartItems.map((item) => (
                  <li key={item.id} className='c-checkout__item'>
                    <div className='c-checkout__item-content'>
                      <div className='c-checkout__item-info'>
                        <div className='c-checkout__item-image-wrapper'>
                          <div className='c-checkout__item-image'>
                            <img src={item.images[0]} alt='' />
                          </div>
                        </div>
                        <div className='c-checkout__item-detail'>
                          <span className='c-checkout__item-name'>{item.name}</span>
                          <span className='c-checkout__item-category'>{item.category}</span>
                          <span className='c-checkout__item-price'>${item.price}</span>
                        </div>
                      </div>
                      <div className='c-checkout__item-option'>
                        <div className='c-checkout__item-quantity'>
                          <button onClick={() => dispatchDecrease(item.id)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => dispatchIncrease(item.id)}>+</button>
                        </div>
                        <button onClick={() => dispatchRemove(item.id)} className='c-checkout__item-remove'>
                          remove
                        </button>
                      </div>
                      <div className='c-checkout__item-sum'>
                        <span>${item.sum}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='c-checkout__confirm'>
                <span className='c-checkout__confirm-sum'>TOTAL: ${cart.sum}</span>
                <p>Shipping & taxes calculated at checkout</p>
                <div className='c-checkout__confirm-terms'>
                  <input type='checkbox' name='' id='' />
                  <span>I agree with the terms and conditions.</span>
                </div>
                <button onClick={purchaseItems}>Checkout</button>
              </div>
            </>
          )}
        </div>
      </Section>
      <Footer />
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
    dispatchClear: () => dispatch(dispatchClearCart()),
    updateUserStatus: (id: string) => dispatch(updateUserStatus(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
