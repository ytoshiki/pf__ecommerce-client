import { useEffect, useRef, useState } from 'react';
import { generateKey } from '../utils/generateKey';
import ProductItem from './ProductItem';
import SelectOptions from './SelectOptions';
import '../styles/components/ProductList.scss';
import { useWindowSize } from '../hooks/resize';

export interface ProductListProps {
  items: any[];
}

const optionsList = {
  name_atoz: 'atoz',
  name_ztoa: 'ztoa',
  price_ltoh: 'ltoh',
  price_htol: 'htol',
  date_oton: 'oton',
  date_ntoo: 'ntoo'
};

const ProductList: React.FC<ProductListProps> = ({ items }) => {
  const [option, setOption] = useState('atoz');

  const [column, setColumn] = useState('is-column-three');

  const [sortedItems, setSortedItems] = useState<any[]>([]);
  // const itemsRef = useRef(renderItems);

  useEffect(() => {
    if (!Object.values(optionsList).some((optionItem) => optionItem === option)) {
      return;
    }

    let sortedArray;
    // let copiedArray = [...itemsRef.current];
    let copiedArray = [...items];
    switch (option) {
      case optionsList.name_atoz:
        sortedArray = copiedArray.sort(function (a, b) {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        setSortedItems(sortedArray);
        break;
      case optionsList.name_ztoa:
        sortedArray = copiedArray.sort(function (a, b) {
          var nameA = a.name.toUpperCase();
          var nameB = b.name.toUpperCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }

          return 0;
        });
        setSortedItems(sortedArray);
        break;
      case optionsList.price_htol:
        sortedArray = copiedArray.sort(function (a, b) {
          var priceA = a.price;
          var priceB = b.price;
          if (priceA > priceB) {
            return -1;
          }
          if (priceA < priceB) {
            return 1;
          }

          return 0;
        });
        setSortedItems(sortedArray);
        break;
      case optionsList.price_ltoh:
        sortedArray = copiedArray.sort(function (a, b) {
          var priceA = a.price;
          var priceB = b.price;
          if (priceA < priceB) {
            return -1;
          }
          if (priceA > priceB) {
            return 1;
          }

          return 0;
        });
        setSortedItems(sortedArray);
        break;
      case optionsList.date_oton:
        sortedArray = copiedArray.sort(function (a, b) {
          var dateA = new Date(a.createdAt).getTime();
          var dateB = new Date(b.createdAt).getTime();
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }

          return 0;
        });

        setSortedItems(sortedArray);
        break;
      case optionsList.date_ntoo:
        sortedArray = copiedArray.sort(function (a, b) {
          var dateA = new Date(a.createdAt).getTime();
          var dateB = new Date(b.createdAt).getTime();
          if (dateA > dateB) {
            return -1;
          }
          if (dateA < dateB) {
            return 1;
          }

          return 0;
        });

        setSortedItems(sortedArray);
        break;

      default:
      // setRenderItems([...(renderItems as any)]);
    }
  }, [option, items]);

  // Toggle Column based off the screen size
  const [width, height] = useWindowSize();
  if (width < 500) {
    if (column === 'is-column-three') {
      setColumn('is-column-two');
    }
  }

  if (width > 500 && column === 'is-column-one') {
    setColumn('is-column-two');
  }

  const onChange = (e: any) => {
    setOption(e.target.value);
  };

  const changeColumn = (num: 'two' | 'three' | 'one') => {
    setColumn(`is-column-${num}`);
  };

  return (
    <div className='c-product-list'>
      <SelectOptions onChange={onChange} option={option} toggleColumn={changeColumn} column={column} />
      <div className={`c-product-list__items ${column}`}>
        {sortedItems.length > 0 &&
          sortedItems.map((item: any) => {
            return <ProductItem key={generateKey(item._id)} item={item} />;
          })}
        {/* {items.length &&
          items.map((item: any) => {
            return <ProductItem key={generateKey(item._id)} item={item} />;
          })} */}
      </div>
    </div>
  );
};

export default ProductList;
