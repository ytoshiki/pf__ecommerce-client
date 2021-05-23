import { Link } from 'react-router-dom';
import '../styles/components/ProductItem.scss';

export interface ProductItemProps {
  item: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  return (
    <div className='c-product-item'>
      <div className='c-product-item__image'>
        <Link to={`/products/${item._id}`}>
          <img src={item.images[0]} alt='' />
        </Link>
      </div>
      <div>
        <Link to={`/products/${item._id}`}>{item.name}</Link>
      </div>
      <div>{item.price}</div>
    </div>
  );
};

export default ProductItem;
