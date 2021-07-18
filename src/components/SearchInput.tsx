import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface SearchInputProps {
  onChange: (e: any) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  return (
    <div className='l-search__input'>
      <FontAwesomeIcon icon={faSearch} color='#bbb' className='l-search__input-icon' />
      <input autoFocus type='text' onChange={onChange} placeholder='Search products...' />
    </div>
  );
};

export default SearchInput;
