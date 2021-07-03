import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../styles/components/ReviewList.scss';

export interface TPurchaseItem {
  name: string;
  price: number;
  images: string[];
  _id: string;
}

export interface PurchaseHistoryListProps {
  purchaseItems: TPurchaseItem[];
}

const PurchaseHistoryList: React.FC<PurchaseHistoryListProps> = ({ purchaseItems }) => {
  const renderPurchaseItems = () => {
    return purchaseItems.map((item) => {
      return (
        <li key={uuidv4()} className='c-reviewList__item'>
          <div className='c-reviewList__block'>
            <div className='c-reviewList__image'>
              <img src={item.images[0]} alt='' />
            </div>

            <div className='c-reviewList__detail'>
              <div className='c-reviewList__name'>{item.name}</div>
              <div className='c-reviewList__price'>${item.price}</div>
            </div>
          </div>
          <div>
            <Link to='/'>Write a review</Link>
          </div>
        </li>
      );
    });
  };
  return (
    <div>
      <ul className='c-reviewList'>{renderPurchaseItems()}</ul>
    </div>
  );
};

export default PurchaseHistoryList;
