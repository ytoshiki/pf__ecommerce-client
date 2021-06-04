import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AddCartButton from '../components/AddCartButton';
import ProductBestSeller from '../components/ProductBestSellter';
import ProductRecent from '../components/ProductRecent';
import Main from '../layouts/Main';
import Section from '../layouts/Section';
import { ProductApiTypes } from '../types/api/ProductApiTypes';

export interface SingleProductPageProps {}

const SingleProductPage: React.FC<SingleProductPageProps> = () => {
  const params = useParams();
  const id = (params as { id: string }).id;
  const [product, setProduct] = useState<ProductApiTypes>();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    let mounted = true;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}products/${id}`);
        const data = await response.data;

        if (!data.success) throw new Error(data.message || 'Fetch Error');

        const product: ProductApiTypes = data.product;

        setProduct(product);
      } catch (error) {}
    };

    if (mounted) fetchProduct();

    return () => {
      mounted = false;
    };
  }, [id]);

  const changeQuantity = (option: string) => {
    if (option === '+') return setQuantity(quantity + 1);

    if (quantity === 1) return;

    setQuantity(quantity - 1);
  };

  return (
    <Main>
      <Section>
        <div>
          <div>
            <div>
              <img src={product?.images[0]} alt='' />
            </div>
            <div>
              <div>
                <h1>{product?.name}</h1>
                <span>{product?._id}</span>
                <span>{product?.price}</span>
              </div>
              <div>
                <div>
                  <button onClick={() => changeQuantity('-')}>-</button>
                  {quantity}
                  <button onClick={() => changeQuantity('+')}>+</button>
                </div>
                {product && <AddCartButton id={product?._id} quantity={quantity} />}
              </div>
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
    </Main>
  );
};

export default SingleProductPage;
