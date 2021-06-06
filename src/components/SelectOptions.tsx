import { faTh, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/components/SelectOptions.scss';
export interface SelectOptionsProps {
  onChange: (e: any) => any;
  option: string;
  toggleColumn: (num: 'two' | 'three' | 'one') => void;
  column: string;
}

const SelectOptions: React.FC<SelectOptionsProps> = ({ onChange, option, toggleColumn, column }) => {
  return (
    <div className='c-select-options'>
      <div className='c-select-options__column'>
        <div onClick={() => toggleColumn('two')} className={`${column === 'is-column-two' ? 'is-active' : ''} c-select-options__icon`}>
          <FontAwesomeIcon icon={faThLarge} size='lg' />
        </div>
        <div onClick={() => toggleColumn('three')} className={`${column === 'is-column-three' ? 'is-active' : ''} c-select-options__icon`}>
          <FontAwesomeIcon icon={faTh} size='lg' />
        </div>
      </div>
      <div className='c-select-options__sort'>
        <select name='' id='' onChange={onChange} value={option}>
          <option defaultChecked disabled>
            SORT
          </option>
          <option value='atoz'>ALPHABETICALLY, A-Z</option>
          <option value='ztoa'>ALPHABETICALLY,Z-A</option>
          <option value='ltoh'>PRICE, LOW TO HIGH</option>
          <option value='htol'>PRICE, HIGH T LOW</option>
          <option value='oton'>DATE, OLD TO NEW</option>
          <option value='ntoo'>DATE, NEW TO OLD</option>
        </select>
      </div>
    </div>
  );
};

export default SelectOptions;
