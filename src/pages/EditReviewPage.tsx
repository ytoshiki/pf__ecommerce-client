import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Label from '../components/Label';
import Footer from '../layouts/Footer';
import Main from '../layouts/Main';
import Section from '../layouts/Section';
import { updateUserStatus } from '../store/actions/customer.action';
import { storeTypes } from '../types/store/storeTypes';
import { IProductApi, TProduct } from './WriteReviewPage';

export interface EditReviewPageProps {
  customerId: string;
  updateUserStatus: (id: string) => boolean;
}

export interface TReview {
  comment: string;
  customer: string;
  product: string;
  rating: number;
  _id: string;
  createdAt: string;
}

const EditReviewPage: React.FC<EditReviewPageProps> = ({ customerId, updateUserStatus }) => {
  const history = useHistory();
  const params: { id: string } = useParams();
  const { id } = params;
  const [reviewId, setReviewId] = useState('');

  // States
  const [product, setProduct] = useState<TProduct | null>(null);
  const [prevReview, setPrevReview] = useState<TReview | null>(null);

  useEffect(() => {
    const navigation = document.querySelector('.l-navigation');
    if (!navigation) return;

    navigation.classList.add('is-scroll');

    return () => {
      navigation.classList.remove('is-scroll');
    };
  }, []);

  const onSubmitReview = () => {
    if (prevReview?.rating === 0) return alert('Please rate the product');

    const confirm = window.confirm('Do you want to update the rating?');

    if (confirm) {
      const updateReview = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}reviews/${reviewId}`, {
            rating: prevReview?.rating,
            comment: prevReview?.comment || '',
            customer: customerId,
            product: product?._id
          });

          const data = await response.data;

          if (!data.success) {
            return alert('Something went wrong');
          }

          const updateSuccess = updateUserStatus(customerId);

          if (!updateSuccess) {
            console.error('user update failed');
          }

          alert('Thank you');

          return history.push('/');
        } catch (error) {
          return alert('Something went wrong');
        }
      };

      updateReview();
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchItem = async () => {
      try {
        const response = await axios(`${process.env.REACT_APP_API_ENDPOINT}products/${id}`);

        const data = await response.data;

        if (!data.success) {
          throw new Error(data.message || 'Something went wrong');
        }

        const product: IProductApi = data.product;

        const hasReviewed = product.reviews.some((review) => {
          return review.customer === customerId;
        });

        if (!hasReviewed) {
          return history.push('/');
        }

        product.reviews.forEach((review) => {
          if (review.customer === customerId && mounted) {
            setPrevReview(review);
            setReviewId(review._id);
          }
        });

        if (mounted) {
          setProduct({
            images: product.images,
            _id: product._id,
            name: product.name,
            price: product.price
          });
        }
      } catch (error) {}
    };

    fetchItem();
    return () => {
      mounted = false;
    };
  }, [id, customerId, history]);

  const renderRating = () => {
    if (product?._id && prevReview?._id) {
      return (
        <div className='c-rate'>
          <div className='c-rate__block'>
            <Label size={1} title='Rate your experience' sub='' />

            <Rating
              emptySymbol={<FontAwesomeIcon icon={faStar} color='grey' size='2x' />}
              fullSymbol={<FontAwesomeIcon icon={faStar} color='#FDCC0D' size='2x' />}
              fractions={2}
              initialRating={prevReview.rating}
              onChange={(e: number) => {
                setPrevReview({
                  ...prevReview,
                  rating: e
                });
              }}
            />
          </div>

          <div className='c-rate__block'>
            <Label size={1} title='Write Review' sub='' />

            <textarea
              placeholder='Write your Experience'
              value={prevReview.comment}
              onChange={(e) =>
                setPrevReview({
                  ...prevReview,
                  comment: e.target.value
                })
              }
              className='c-rate__input'
            />
          </div>
          <button onClick={onSubmitReview}>Submit</button>
        </div>
      );
    }
  };

  const renderItem = () => {
    return product?._id ? (
      <li className='c-reviewList__item'>
        <div className='c-reviewList__block'>
          <div className='c-reviewList__image'>
            <img src={product.images[0]} alt='' />
          </div>

          <div className='c-reviewList__detail'>
            <div className='c-reviewList__name'>{product.name}</div>
            <div className='c-reviewList__price'>${product.price}</div>
          </div>
        </div>
      </li>
    ) : (
      false
    );
  };

  return (
    <Main>
      <Section size='is-xlg'>
        <Label size={1} title='Edit Review' sub='' />
        <div className='l-container'>
          {' '}
          <div>
            <ul className='c-reviewList'>{renderItem()}</ul>
          </div>
        </div>
      </Section>

      <Section>
        <div className='l-container'>{renderRating()}</div>
      </Section>
      <Footer />
    </Main>
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    customerId: store.customer.id
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateUserStatus: (id: string) => dispatch(updateUserStatus(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReviewPage);
