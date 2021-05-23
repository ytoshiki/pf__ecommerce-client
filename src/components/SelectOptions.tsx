import { useEffect, useState } from 'react';

export interface SelectOptionsProps {
  onChange: (e: any) => any;
  option: string;
  toggleColumn: (num: 'two' | 'three' | 'one') => void;
}

const SelectOptions: React.FC<SelectOptionsProps> = ({ onChange, option, toggleColumn }) => {
  return (
    <div>
      <div>
        <div onClick={() => toggleColumn('two')}>two</div>
        <div onClick={() => toggleColumn('three')}>three</div>
      </div>
      <select name='' id='' onChange={onChange} value={option}>
        <option value='atoz'>A-Z</option>
        <option value='ztoa'>Z-A</option>
        <option value='ltoh'>L-H</option>
        <option value='htol'>H-L</option>
        <option value='oton'>O-N</option>
        <option value='ntoo'>N-O</option>
      </select>
    </div>
  );
};

export default SelectOptions;
