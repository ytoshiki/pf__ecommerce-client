import '../styles/components/ReviewList.scss';
import { TPurchasedItems } from '../types/store/customer/stateTypes';
import { v4 as uuidv4 } from 'uuid';
import ReviewItem from './ReviewItem';

export interface PurchaseHistoryListProps {
  purchaseItems: TPurchasedItems[];
}

const PurchaseHistoryList: React.FC<PurchaseHistoryListProps> = ({ purchaseItems }) => {
  const renderPurchaseItems = () => {
    return purchaseItems.map((item) => {
      return <ReviewItem item={item} key={uuidv4()} />;
    });
  };
  return (
    <div>
      <ul className='c-reviewList'>{renderPurchaseItems()}</ul>
    </div>
  );
};

export default PurchaseHistoryList;
