import { Link } from 'react-router-dom';
import { ProductApiTypes } from '../types/api/ProductApiTypes';
import { generateKey } from '../utils/generateKey';
import '../styles/components/SearchResult.scss';

export interface SearchResultProps {
  items: ProductApiTypes[];
}

const SearchResult: React.FC<SearchResultProps> = ({ items }) => {
  return (
    <div className='c-search-result'>
      <div className='c-search-result__hit'>
        <span>{items.length ? items.length + `result${items.length > 1 ? 's' : ''}` : 'No Matches'}</span>
      </div>
      <div className='c-search-result__matches'>
        {items.map((item) => {
          return (
            <div key={generateKey(item._id)} className='c-search-result__match'>
              <Link to={`/products/${item._id}`}>
                <div className='c-search-result__image'>
                  <div className='c-search-result__image-wrapper'>
                    <img src={item.images[0]} alt='' />
                  </div>
                </div>
                <span className='c-search-result__name'>{item.name}</span>
                <span className='c-search-result__price'>${item.price}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResult;
