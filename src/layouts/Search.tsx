import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchInput from '../components/SearchInput';
import SearchResult from '../components/SearchResult';
import { ProductApiTypes } from '../types/api/ProductApiTypes';

export interface SearchProps {
  hidden: (bool: boolean) => void;
}

const searchProducts = (data: ProductApiTypes[], term: string) => {
  return data.filter((product) => product.name.toLowerCase().trim().includes(term.toLowerCase().trim()));
};

const Search: React.FC<SearchProps> = ({ hidden }) => {
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
    }, 1000);
  };

  return (
    <div>
      <div>
        <SearchInput onChange={onChange} />
        <div onClick={() => hidden(false)}>X</div>
      </div>
      {filteredProducts.length ? <SearchResult items={filteredProducts} /> : null}
    </div>
  );
};

export default Search;
