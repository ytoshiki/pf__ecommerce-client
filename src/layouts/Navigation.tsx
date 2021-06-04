import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigationList from '../components/NavigationList';
import NavigationOptionList from '../components/NavigationOptionList';
import { dispatchfetchCategories } from '../store/actions/category.action';
import { CartState } from '../types/store/cart/stateTypes';
import { CategoryState } from '../types/store/categories/stateTypes';
import { storeTypes } from '../types/store/storeTypes';
import '../styles/layouts/Navigation.scss';

export interface NavigationProps {
  categories: CategoryState[];
  fetchCategories: () => void;
  cart: CartState;
}

const Navigation: React.FC<NavigationProps> = ({ categories, fetchCategories, cart }) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) fetchCategories();

    return () => {
      mounted = false;
    };
  }, [fetchCategories]);

  console.log(cart);

  return (
    <nav className='l-navigation'>
      {categories.length && <NavigationList items={categories} property='name' link='id' />}
      <div className='l-navigation__logo'>
        <Link to='/'>W</Link>
      </div>
      <NavigationOptionList hasItemsInCart={cart.cartItems.length ? true : false} />
    </nav>
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    categories: store.categories,
    cart: store.cart
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCategories: () => dispatch(dispatchfetchCategories())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
