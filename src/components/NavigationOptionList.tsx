import { faSearch, faShoppingBag, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../layouts/Cart';
import Search from '../layouts/Search';

export interface NavigationOptionListProps {}

const NavigationOptionList: React.FC<NavigationOptionListProps> = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <>
      <ul>
        <li>
          <Link to='/register'>
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </li>
        <li
          onClick={() => {
            cartVisible && setCartVisible(!cartVisible);
            setSearchVisible(!searchVisible);
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </li>
        <li
          onClick={() => {
            searchVisible && setSearchVisible(!searchVisible);
            setCartVisible(!cartVisible);
          }}
        >
          <FontAwesomeIcon icon={faShoppingBag} />
        </li>
        <li>
          <Link to='/register'>login</Link>
        </li>
      </ul>
      {searchVisible && <Search hidden={setSearchVisible} />}
      {cartVisible && <Cart />}
    </>
  );
};

export default NavigationOptionList;
