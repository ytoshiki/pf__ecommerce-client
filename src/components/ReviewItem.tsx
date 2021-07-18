import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { TPurchasedItems } from '../types/store/customer/stateTypes';
import { storeTypes } from '../types/store/storeTypes';

export interface ReviewItemProps {
  item: TPurchasedItems;
  customerId: string;
}

const haveReviewed = (item: TPurchasedItems, customerId: string) => {
  const result = item.reviews.find((review) => {
    return review.customer === customerId;
  });

  if (!result) {
    return false;
  }

  return result;
};

const ReviewItem: React.FC<ReviewItemProps> = ({ item, customerId }) => {
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
        {haveReviewed(item, customerId) ? (
          <div>
            <Link to={`/reviews/edit/${item._id}`}>Edit Review</Link>
          </div>
        ) : (
          <Link to={`/reviews/${item._id}`}>Write Review</Link>
        )}
      </div>
    </li>
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    customerId: store.customer.id
  };
};

export default connect(mapStateToProps)(ReviewItem);
