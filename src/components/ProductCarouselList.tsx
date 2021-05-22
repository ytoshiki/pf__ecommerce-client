import Slider from 'react-slick';
import { generateKey } from '../utils/generateKey';
import ProductCarouselItem from './ProductCarouselItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export interface ProductCarouselListProps {
  options?: {
    dots: boolean;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    slidesToScroll: number;
    autoplay: boolean;
    draggable: boolean;
    arrows: boolean;
  };
  items: any[];
}

const ProductCarouselList: React.FC<ProductCarouselListProps> = ({ options, items }) => {
  if (!options) {
    options = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      draggable: true,
      arrows: true
    };
  }

  return (
    <div>
      <Slider {...options}>
        {items.map((item, index) => {
          return <ProductCarouselItem key={generateKey(String(index))} item={item} properties={['name', 'id', 'price']} array={['images']} />;
        })}
      </Slider>
    </div>
  );
};

export default ProductCarouselList;
