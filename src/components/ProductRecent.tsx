import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductApiTypes } from '../types/api/ProductApiTypes';

import { compareProfit } from '../utils/compare';
import Label from './Label';
import ProductCarouselList from './ProductCarouselList';

export interface ProductRecentProps {}

const ProductRecent: React.FC<ProductRecentProps> = () => {
  const [productData, setProductData] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;

    const logPurchases = async () => {
      try {
        const request = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}products`);
        const data = request.data;

        // Error handlind
        if (!data.success) return;

        const products: ProductApiTypes[] = data.products;

        if (!products.length) return;

        const sortedProducts = products.sort((curr, prev) => {
          return new Date(prev.createdAt).getTime() - new Date(curr.createdAt).getTime();
        });

        if (mounted) setProductData(sortedProducts.slice(0, 6));

        const cleanup = () => {
          mounted = false;
        };

        return cleanup;
      } catch {}
    };

    logPurchases();
  }, []);

  const renderDOM =
    productData.length > 0 ? (
      <>
        <Label size={1} title='New' sub='' />
        <ProductCarouselList items={productData} />
      </>
    ) : null;

  return renderDOM;
};

export default ProductRecent;
