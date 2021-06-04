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

export interface NavigationOptionListProps {
  hasItemsInCart?: boolean;
  option: OptionData;
  openCart: () => void;
  openSearch: () => void;
  closeCart: () => void;
  closeSearch: () => void;
}

const NavigationOptionList: React.FC<NavigationOptionListProps> = ({ hasItemsInCart, option, openCart, openSearch, closeCart, closeSearch }) => {
  return (
    <>
      <ul className='l-navigation__list'>
        <li className='l-navigation__item'>
          <Link to='/register'>
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </li>
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
          <FontAwesomeIcon icon={faSearch} />
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
          className='l-navigation__item'
        >
          {hasItemsInCart && <span>*</span>}
          <FontAwesomeIcon icon={faShoppingBag} />
        </li>
        <li className='l-navigation__item'>
          <Link to='/register'>login</Link>
        </li>
      </ul>
      {option.search && <Search />}
      {option.cart && <Cart />}
      {option.cart && <div className='PageOverlay' onClick={closeCart}></div>}
      {option.search && <div className='PageOverlay is-search' onClick={closeSearch}></div>}
    </>
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    option: store.option
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    openCart: () => dispatch(dispatchOpenCart()),
    closeCart: () => dispatch(dispatchCloseCart()),
    openSearch: () => dispatch(dispatchOpenSearch()),
    closeSearch: () => dispatch(dispatchCloseSearch())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationOptionList);
