import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SearchInput from '../components/SearchInput';
import SearchResult from '../components/SearchResult';
import { dispatchCloseSearch } from '../store/actions/option.action';
import { ProductApiTypes } from '../types/api/ProductApiTypes';
import '../styles/layouts/Search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export interface SearchProps {
  closeSearch: () => void;
}

const searchProducts = (data: ProductApiTypes[], term: string) => {
  return data.filter((product) => product.name.toLowerCase().trim().includes(term.toLowerCase().trim()));
};

const Search: React.FC<SearchProps> = ({ closeSearch }) => {
  const [products, setProducts] = useState<ProductApiTypes[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductApiTypes[]>([]);

  useEffect(() => {
    if (products.length) return;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}products`);
        const data = await response.data;
        if (!data.success) {
          throw new Error('Something went wrong');
        }

        const products: ProductApiTypes[] = data.products;

        if (!products.length) throw new Error('Products Not Found');

        setProducts(products);
      } catch (error) {
        console.log(error.message);
        return;
      }
    };

    fetchProducts();
  }, [products, setProducts]);

  const onChange = (e: any) => {
    if (e.target.value === '') return setFilteredProducts([]);
    setTimeout(() => {
      setFilteredProducts(searchProducts(products, e.target.value));
    }, 300);
  };

  return (
    <div className='l-search'>
      <div className='l-search__inner'>
        <SearchInput onChange={onChange} />
        <button className='l-search__close' onClick={closeSearch}>
          <FontAwesomeIcon icon={faTimes} color='#bbb' />
        </button>
      </div>
      {filteredProducts.length ? <SearchResult items={filteredProducts} /> : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    closeSearch: () => dispatch(dispatchCloseSearch())
  };
};

export default connect(null, mapDispatchToProps)(Search);
