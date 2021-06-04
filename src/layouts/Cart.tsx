import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { dispatchDecreaseQuantity, dispatchIncreaseQuantity, dispatchRemoveItem } from '../store/actions/cart.action';
import { CartState } from '../types/store/cart/stateTypes';
import { storeTypes } from '../types/store/storeTypes';
import '../styles/layouts/Cart.scss';

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
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div>
            <Link to='/checkout'>
              <button>
                Checkout
                <span>{cart.sum}</span>
              </button>
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
