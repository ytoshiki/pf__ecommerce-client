import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { generateKey } from '../utils/generateKey';
import '../styles/layouts/Review.scss';
import Rating from 'react-rating';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';

export interface ReviewProps {
  id: string;
}

interface CustomerType {
  avator: string;
  username: string;
}

interface ReviewType {
  comment: string;
  createdAt: string;
  customer: CustomerType;
  rating: number;
}

const Review: React.FC<ReviewProps> = ({ id }) => {
  const [reviews, setReviews] = useState<ReviewType[]>([]);

  useEffect(() => {
    let mounted = true;
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}reviews/product/${id}`);
        const data = await response.data;

        if (!data.success) {
          throw new Error(data.message || 'Something went wrong');
        }

        if (mounted) setReviews(data.reviews);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchReviews();

    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className='l-review'>
      {reviews.length > 0 ? (
        <div className='l-review__inner'>
          <div className='l-review__top'>
            <span>
              {reviews.length} {reviews.length > 1 ? 'reviews' : 'review'}
            </span>
            <span className='l-review__top-rating'>
              {
                <Rating
                  initialRating={
                    reviews.reduce(function (acc, obj) {
                      return acc + obj.rating;
                    }, 0) / reviews.length
                  }
                  emptySymbol={<FontAwesomeIcon icon={faStar} color='grey' />}
                  fullSymbol={<FontAwesomeIcon icon={faStar} color='#FDCC0D' />}
                  readonly
                />
              }
            </span>
          </div>
          <div className='l-review__list'>
            {reviews.map((review) => {
              return (
                <div key={generateKey(review.createdAt)} className='l-review__item'>
                  <div className='l-review__name'>
                    <div className='l-review__avator'>
                      <img src={review.customer.avator} alt='' />
                    </div>
                    <div className='l-review__name'>{review.customer.username}</div>
                    <div className='l-review__date'>{<Moment format='DD, MMM, YYYY'>{new Date(review.createdAt)}</Moment>}</div>
                  </div>
                  <div className='l-review__rating'>{<Rating initialRating={review.rating} emptySymbol={<FontAwesomeIcon icon={faStar} color='grey' />} fullSymbol={<FontAwesomeIcon icon={faStar} color='#FDCC0D' />} readonly />}</div>
                  <div className='l-review__comment'>{review.comment}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default Review;
