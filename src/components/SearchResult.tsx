import { Link } from 'react-router-dom';
import { ProductApiTypes } from '../types/api/ProductApiTypes';

import { generateKey } from '../utils/generateKey';

export interface SearchResultProps {
  items: ProductApiTypes[];
}

const SearchResult: React.FC<SearchResultProps> = ({ items }) => {
  return (
    <div>
      <div>
        <span>{items.length ? items.length + `result${items.length > 1 ? 's' : ''}` : 'No Matches'}</span>
      </div>
      {items.map((item) => {
        return (
          <div key={generateKey(item._id)}>
            <Link to={`/products/${item._id}`}>{item.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResult;
