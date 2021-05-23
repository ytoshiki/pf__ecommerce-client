import { useEffect, useRef, useState } from 'react';
import { generateKey } from '../utils/generateKey';
import ProductItem from './ProductItem';
import SelectOptions from './SelectOptions';
import '../styles/components/ProductList.scss';

export interface ProductListProps {
  items: any[];
}

const ProductList: React.FC<ProductListProps> = ({ items }) => {
  const [renderItems, setRenderItems] = useState<any[]>(items);
  const [option, setOption] = useState('atoz');

  const itemsRef = useRef(renderItems);

  useEffect(() => {
    console.log('effect');

    const optionsList = {
      name_atoz: 'atoz',
      name_ztoa: 'ztoa',
      price_ltoh: 'ltoh',
      price_htol: 'htol',
      date_oton: 'oton',
      date_ntoo: 'ntoo'
    };

    console.log(option);
    if (!Object.values(optionsList).some((optionItem) => optionItem === option)) {
      return;
    }

    let sortedArray;
    let copiedArray = [...itemsRef.current];
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
        setRenderItems([...sortedArray]);
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
        setRenderItems([...sortedArray]);
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
        setRenderItems([...sortedArray]);
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
        setRenderItems([...sortedArray]);
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
        console.log(sortedArray);
        setRenderItems([...sortedArray]);
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
        console.log(sortedArray);
        setRenderItems([...sortedArray]);
        break;

      default:
        setRenderItems([...itemsRef.current]);
    }
  }, [option, setRenderItems]);

  const onChange = (e: any) => {
    setOption(e.target.value);
  };

  const [column, setColumn] = useState('');

  const changeColumn = (num: 'two' | 'three' | 'one') => {
    setColumn(`is-column-${num}`);
  };

  return (
    <div className='c-product-list'>
      <SelectOptions onChange={onChange} option={option} toggleColumn={changeColumn} />
      <div className={`c-product-list__items ${column}`}>
        {renderItems.length &&
          renderItems.map((item: any) => {
            return <ProductItem key={generateKey(item._id)} item={item} />;
          })}
      </div>
    </div>
  );
};

export default ProductList;
