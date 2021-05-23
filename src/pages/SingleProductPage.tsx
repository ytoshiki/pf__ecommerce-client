import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ProductApiTypes } from '../types/api/ProductApiTypes';

export interface SingleProductPageProps {}

const SingleProductPage: React.FC<SingleProductPageProps> = () => {
  const params = useParams();
  const id = (params as { id: string }).id;
  const [product, setProduct] = useState<ProductApiTypes>();

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

  console.log(product);
  return <div>single product</div>;
};

export default SingleProductPage;
