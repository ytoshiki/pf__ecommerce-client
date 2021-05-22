import { Link } from 'react-router-dom';
import { generateKey } from '../utils/generateKey';

export interface ProductCarouselItemProps {
  item: any;
  properties: string[] | null;
  array: string[];
}

const ProductCarouselItem: React.FC<ProductCarouselItemProps> = ({ item, properties, array }) => {
  return (
    <div>
      <Link to={`/products/${item.id}`}>
        <img src={item[array[0]][0]} alt='' />
        {properties?.map((property) => {
          return <div key={generateKey(property)}>{item[property]}</div>;
        })}
      </Link>
    </div>
  );
};

export default ProductCarouselItem;
