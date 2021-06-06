import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { dispatchDecreaseQuantity, dispatchIncreaseQuantity, dispatchRemoveItem } from '../store/actions/cart.action';
import { CartState } from '../types/store/cart/stateTypes';
import { storeTypes } from '../types/store/storeTypes';
import '../styles/layouts/Cart.scss';
import Button from '../components/Button';

export interface CartProps {
  cart: CartState;
  dispatchIncrease: (id: string) => void;
  dispatchDecrease: (id: string) => void;
  dispatchRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ cart, dispatchIncrease, dispatchDecrease, dispatchRemove }) => {
  return (
    <div className='l-cart'>
      <h2>Cart</h2>
      {cart.sum > 100 ? <p>You are eligible for free shipping</p> : <p>You need to purchase more than $100 for free shipping</p>}

      {cart.cartItems.length > 0 && (
        <>
          <ul className='l-cart__list'>
            {cart.cartItems.map((item) => (
              <li key={item.id} className='l-cart__item'>
                <div className='l-cart__item-inner'>
                  <div className='l-cart__item-image-wrapper'>
                    <div className='l-cart__item-image'>
                      <img src={item.images[0]} alt='' />
                    </div>
                  </div>
                  <div className='l-cart__item-info'>
                    <div className='l-cart__item-detail'>
                      <span className='l-cart__item-name'>{item.name}</span>
                      <span className='l-cart__item-price'>${item.price}</span>
                    </div>
                    <div className='l-cart__option'>
                      <div className='l-cart__quantity'>
                        <button onClick={() => dispatchDecrease(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatchIncrease(item.id)}>+</button>
                      </div>
                      <button className='l-cart__remove' onClick={() => dispatchRemove(item.id)}>
                        remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className='l-cart__checkout'>
            <Link to='/checkout'>
              <Button>
                <span className='l-cart__checkout-title'>Checkout: </span>
                <span className='l-cart__checkout-sub'>{cart.sum}</span>
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    cart: store.cart
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchIncrease: (id: string) => dispatch(dispatchIncreaseQuantity(id)),
    dispatchDecrease: (id: string) => dispatch(dispatchDecreaseQuantity(id)),
    dispatchRemove: (id: string) => dispatch(dispatchRemoveItem(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
