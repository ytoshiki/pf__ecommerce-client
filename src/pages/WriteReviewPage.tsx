import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../styles/components/ReviewList.scss';
import Main from '../layouts/Main';
import Section from '../layouts/Section';
import Footer from '../layouts/Footer';
import Label from '../components/Label';
import Rating from 'react-rating';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { storeTypes } from '../types/store/storeTypes';
import '../styles/components/Rate.scss';
import { updateUserStatus } from '../store/actions/customer.action';

export interface WriteReviewPageProps {
  customerId: string;
  updateUserStatus: (id: string) => boolean;
}

export interface IProductApi {
  images: string[];
  name: string;
  price: number;
  _id: string;
  reviews: {
    comment: string;
    createdAt: string;
    customer: string;
    product: string;
    rating: number;
    _id: string;
  }[];
}

export interface TProduct {
  images: string[];
  name: string;
  price: number;
  _id: string;
}

const WriteReviewPage: React.FC<WriteReviewPageProps> = ({ customerId, updateUserStatus }) => {
  const history = useHistory();
  const params: { id: string } = useParams();
  const { id } = params;

  // States
  const [product, setProduct] = useState<TProduct | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    const navigation = document.querySelector('.l-navigation');
    if (!navigation) return;

    navigation.classList.add('is-scroll');

    return () => {
      navigation.classList.remove('is-scroll');
    };
  }, []);

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

        if (
          product.reviews.some((review) => {
            return review.customer === customerId;
          })
        ) {
          return history.push('/');
        }

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

  const onSubmitReview = () => {
    if (rating === 0) return alert('Please rate the product');

    const confirm = window.confirm('Do you want to rate the product?');

    if (confirm) {
      const reviewProduct = async () => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}reviews`, {
            rating,
            comment: review || '',
            customer: customerId,
            product: product?._id
          });

          const data = await response.data;

          if (!data.success) {
            return alert('Something went wrong');
          }

          const updateSuccess = updateUserStatus(customerId);

          if (!updateSuccess) console.error('Something went wrong');

          alert('Thank you');

          return history.push('/');
        } catch (error) {
          return alert('Something went wrong');
        }
      };

      reviewProduct();
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

  const renderRating = () => {
    if (product?._id) {
      return (
        <div className='c-rate'>
          <div className='c-rate__block'>
            <Label size={1} title='Rate your experience' sub='' />

            <Rating
              emptySymbol={<FontAwesomeIcon icon={faStar} color='grey' size='2x' />}
              fullSymbol={<FontAwesomeIcon icon={faStar} color='#FDCC0D' size='2x' />}
              fractions={2}
              initialRating={rating}
              onChange={(e: number) => {
                setRating(e);
              }}
            />
          </div>

          <div className='c-rate__block'>
            <Label size={1} title='Write Review' sub='' />

            <textarea placeholder='Write your Experience' value={review} onChange={(e) => setReview(e.target.value)} className='c-rate__input' />
          </div>
          <button onClick={onSubmitReview}>Submit</button>
        </div>
      );
    }
  };

  return (
    <Main>
      <Section size='is-xlg'>
        <Label size={1} title='Review Product' sub='' />
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

export default connect(mapStateToProps, mapDispatchToProps)(WriteReviewPage);
