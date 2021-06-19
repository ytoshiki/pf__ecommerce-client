import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import { dispatchCloseCart, dispatchCloseSearch } from '../store/actions/option.action';
import { storeTypes } from '../types/store/storeTypes';

export interface AppContainerProps {
  closeCart: () => void;
  closeSearch: () => void;
  cart: boolean;
}

const AppContainer: React.FC<AppContainerProps> = ({ children, closeCart, closeSearch, cart }) => {
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      closeCart();
      closeSearch();
    }

    return () => {
      mounted = false;
    };
  }, [location, closeCart, closeSearch]);

  return <div>{children}</div>;
};

const mapStateToProps = (store: storeTypes) => {
  return {
    cart: store.option.cart
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    closeCart: () => dispatch(dispatchCloseCart()),
    closeSearch: () => dispatch(dispatchCloseSearch())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
