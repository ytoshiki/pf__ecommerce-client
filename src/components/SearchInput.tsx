export interface SearchInputProps {
  onChange: (e: any) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  return (
    <div>
      <input type='text' onChange={onChange} />
    </div>
  );
};

export default SearchInput;
