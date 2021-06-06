import { connect } from 'react-redux';
import { dispatchAddCartItem } from '../store/actions/cart.action';
import Button from './Button';

export interface AddCartButtonProps {
  id: string;
  quantity: number;
  dispatchAddToCart: (id: string, quantity: number) => void;
}

const AddCartButton: React.FC<AddCartButtonProps> = ({ id, quantity, dispatchAddToCart }) => {
  const addToCart = () => {
    dispatchAddToCart(id, quantity);
  };

  return (
    <Button>
      <span onClick={addToCart}>ADD TO CART</span>{' '}
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchAddToCart: (id: string, quantity: number) => dispatch(dispatchAddCartItem(id, quantity))
  };
};

export default connect(null, mapDispatchToProps)(AddCartButton);
