import { Link } from 'react-router-dom';
import { generateKey } from '../utils/generateKey';

export interface ProductCarouselItemProps {
  item: any;
  properties: string[] | null;
  array: string[];
}

const ProductCarouselItem: React.FC<ProductCarouselItemProps> = ({ item, properties, array }) => {
  return (
    <div className='slick-item'>
      <Link to={`/products/${item.id || (item as any)._id}`}>
        <div className='slick-image-wrapper'>
          <div className='slick-image'>
            <img src={item[array[0]][0]} alt='' />
          </div>
        </div>

        {properties?.map((property) => {
          return (
            <div key={generateKey(property)} className={property}>
              {property === 'price' ? `$${item[property]}` : item[property]}
            </div>
          );
        })}
      </Link>
    </div>
  );
};

export default ProductCarouselItem;
