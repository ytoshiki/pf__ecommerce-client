import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import AddCartButton from '../components/AddCartButton';
import ProductBestSeller from '../components/ProductBestSellter';
import ProductRecent from '../components/ProductRecent';
import Main from '../layouts/Main';
import Section from '../layouts/Section';
import { ProductApiTypes } from '../types/api/ProductApiTypes';
import '../styles/pages/SingleProduct.scss';
import Footer from '../layouts/Footer';
import Review from '../layouts/Review';
export interface SingleProductPageProps {}

const SingleProductPage: React.FC<SingleProductPageProps> = () => {
  const history = useHistory();
  const params = useParams();
  const id = (params as { id: string }).id;

  const [product, setProduct] = useState<ProductApiTypes>();
  const [quantity, setQuantity] = useState(1);
  const [toggleImage, setToggleImage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    let mounted = true;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}products/${id}`);
        const data = await response.data;

        if (!data.success) throw new Error(data.message || 'Fetch Error');

        const product: ProductApiTypes = data.product;

        if (product.category === null) {
          history.push('/');
        }

        if (mounted) {
          setProduct(product);
        }
      } catch (error) {}
    };

    fetchProduct();

    return () => {
      mounted = false;
    };
  }, [id, history]);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const navigation = document.querySelector('.l-navigation');
      if (navigation) {
        navigation.classList.add('is-scroll');
      }
    }

    return () => {
      mounted = false;
      const navigation = document.querySelector('.l-navigation');
      if (navigation) {
        navigation.classList.remove('is-scroll');
      }
    };
  }, []);

  const changeQuantity = (option: string) => {
    if (option === '+') return setQuantity(quantity + 1);

    if (quantity === 1) return;

    setQuantity(quantity - 1);
  };

  return (
    <Main>
      <Section>
        <div className='c-singleProduct'>
          <div className='c-singleProduct__inner'>
            <div className='c-singleProduct__gallery'>
              <div className='c-singleProduct__image-wrapper'>
                <div
                  className='c-singleProduct__image'
                  onMouseEnter={() => {
                    if (product?.images[1]) {
                      setToggleImage(!toggleImage);
                    }
                  }}
                  onMouseLeave={() => {
                    if (product?.images[1]) {
                      setToggleImage(!toggleImage);
                    }
                  }}
                >
                  <img src={!toggleImage ? product?.images[0] : product?.images[1]} alt='' />
                </div>
              </div>
            </div>
            <div className='c-singleProduct__content'>
              <div className='c-singleProduct__info'>
                <h1 className='c-singleProduct__name'>{product?.name}</h1>
                <span className='c-singleProduct__id'>{product?._id}</span>
                <span className='c-singleProduct__price'>${product?.price}</span>
                <p>Starting at $64/mo with Affirm. Prequalify now</p>
                <p>
                  <strong>Free Ground Shipping Offer</strong>
                </p>
              </div>
              <div className='c-singleProduct__cart'>
                <div className='c-singleProduct__cart-option'>
                  <button onClick={() => changeQuantity('-')}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => changeQuantity('+')}>+</button>
                </div>
                {product && (
                  <div className='c-singleProduct__button'>
                    <AddCartButton id={product?._id} quantity={quantity} />
                  </div>
                )}
              </div>
              <Review id={id} />
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <ProductRecent />
      </Section>
      <Section>
        <ProductBestSeller />
      </Section>
      <Footer />
    </Main>
  );
};

export default SingleProductPage;
