import { faSearch, faShoppingBag, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Cart from '../layouts/Cart';
import Search from '../layouts/Search';
import { OptionData } from '../types/store/option/stateTypes';
import { storeTypes } from '../types/store/storeTypes';
import '../styles/layouts/Navigation.scss';

import { dispatchCloseCart, dispatchCloseSearch, dispatchOpenCart, dispatchOpenSearch } from '../store/actions/option.action';
import { CustomerData } from '../types/store/customer/stateTypes';
import { dispatchLogoutCustomer } from '../store/actions/customer.action';

export interface NavigationOptionListProps {
  hasItemsInCart?: boolean;
  option: OptionData;
  openCart: () => void;
  openSearch: () => void;
  closeCart: () => void;
  closeSearch: () => void;
  logout: () => void;
  user: CustomerData;
}

const NavigationOptionList: React.FC<NavigationOptionListProps> = ({ hasItemsInCart, option, openCart, openSearch, closeCart, closeSearch, user, logout }) => {
  const renderUserLink = () => {
    if (!!user.id) {
      return (
        <Link to='/reviews'>
          <FontAwesomeIcon icon={faUser} size='lg' />
        </Link>
      );
    } else {
      return (
        <Link to='/register'>
          <FontAwesomeIcon icon={faUser} size='lg' />
        </Link>
      );
    }
  };

  const renderRegisterLink = () => {
    if (!!user.id) {
      return <div onClick={logout}>logout</div>;
    } else {
      return <Link to='/register'>login</Link>;
    }
  };

  return (
    <>
      <ul className='l-navigation__list is-option'>
        <li className='l-navigation__item is-sm-hidden'>{renderUserLink()}</li>
        <li
          onClick={() => {
            option.cart && closeCart();
            if (option.search) {
              closeSearch();
            } else {
              openSearch();
            }
          }}
          className='l-navigation__item'
        >
          <FontAwesomeIcon icon={faSearch} size='lg' />
        </li>
        <li
          onClick={() => {
            option.search && closeSearch();
            if (option.cart) {
              closeCart();
            } else {
              openCart();
            }
          }}
          className='l-navigation__item is-no-margin'
        >
          {hasItemsInCart && <span>*</span>}
          <FontAwesomeIcon icon={faShoppingBag} size='lg' />
        </li>
        <li className='l-navigation__item register is-sm-hidden'>{renderRegisterLink()}</li>
      </ul>
      {/* {option.search && <Search />}
      {option.cart && <Cart />} */}
      <Search />
      <Cart />
      {option.cart && <div className='PageOverlay' onClick={closeCart}></div>}
      {option.search && <div className='PageOverlay is-search' onClick={closeSearch}></div>}
    </>
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    option: store.option,
    user: store.customer
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    openCart: () => dispatch(dispatchOpenCart()),
    closeCart: () => dispatch(dispatchCloseCart()),
    openSearch: () => dispatch(dispatchOpenSearch()),
    closeSearch: () => dispatch(dispatchCloseSearch()),
    logout: () => dispatch(dispatchLogoutCustomer())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationOptionList);
