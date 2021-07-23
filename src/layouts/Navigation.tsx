import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigationList from '../components/NavigationList';
import NavigationOptionList from '../components/NavigationOptionList';
import { dispatchfetchCategories } from '../store/actions/category.action';
import { CartState } from '../types/store/cart/stateTypes';
import { CategoryData } from '../types/store/categories/stateTypes';
import { storeTypes } from '../types/store/storeTypes';
import '../styles/layouts/Navigation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SlideBarMenu from '../components/SlidebarMenu';
import { dispatchCloseMenu, dispatchOpenMenu } from '../store/actions/option.action';

export interface NavigationProps {
  categories: CategoryData[];
  fetchCategories: () => void;
  cart: CartState;
  menu: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ categories, fetchCategories, cart, menu, openMenu, closeMenu }) => {
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
      <div className='l-navigation__slidebar'>
        <FontAwesomeIcon icon={faBars} size='lg' onClick={openMenu} />
      </div>
      <SlideBarMenu />
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
    categories: store.categories.categories,
    cart: store.cart,
    menu: store.option.menu
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCategories: () => dispatch(dispatchfetchCategories()),
    openMenu: () => dispatch(dispatchOpenMenu()),
    closeMenu: () => dispatch(dispatchCloseMenu())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
