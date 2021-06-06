import axios from 'axios';
import { useEffect, useState } from 'react';
import { compareProfit } from '../utils/compare';
import Label from './Label';
import ProductCarouselList from './ProductCarouselList';
import '../styles/components/ProductBestSellers.scss';

export interface ProductBestSellerProps {}

const ProductBestSeller: React.FC<ProductBestSellerProps> = () => {
  const [productData, setProductData] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;

    const logPurchases = async () => {
      try {
        const request = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}purchase`);
        const data = request.data;

        // Error handlind
        if (!data.success) return;

        const purchases = data.purchases;

        let nameLists: { name: string; id: string; images: string[] }[] = [];
        let returndata: { name: string; id: string; sold: number; price: number; images: string[] }[] = [];

        purchases
          .filter((purchase: any) => {
            return purchase.product !== null;
          })
          .forEach((purchase: any) => {
            if (
              nameLists.some((list) => {
                return list.id === purchase.product?._id;
              })
            ) {
              returndata.map((obj: { name: string; id: string; sold: number }) => {
                if (obj.id === purchase.product?._id) {
                  obj.sold++;
                }
                return obj;
              });
            } else {
              nameLists.push({
                name: purchase.product?.name as string,
                id: purchase.product?._id as string,
                images: purchase.product.images
              });

              returndata.push({
                name: purchase.product?.name as string,
                id: purchase.product?._id as string,
                price: purchase.product?.price as number,
                images: purchase.product.images,
                sold: 1
              });
            }
          });

        returndata.sort(compareProfit);

        if (mounted) setProductData(returndata.slice(0, 10));
      } catch (error) {
        console.log(error.message);
        return;
      }
    };

    logPurchases();

    const cleanup = () => {
      mounted = false;
    };

    return cleanup;
  }, []);

  const renderDOM = productData.length ? (
    <div className='c-product-best-sellers'>
      {' '}
      <Label size={1} title='Best Sellers' sub='' />
      <ProductCarouselList items={productData} />
    </div>
  ) : null;

  return renderDOM;
};

export default ProductBestSeller;
