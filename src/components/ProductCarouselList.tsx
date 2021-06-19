import Slider from 'react-slick';
import { generateKey } from '../utils/generateKey';
import ProductCarouselItem from './ProductCarouselItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/components/ProductCarousel.scss';

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
    centerMode: boolean;
    autoplaySpeed?: number;
    ease?: string;
    responsive?: any[];
  };
  items: any[];
}

const ProductCarouselList: React.FC<ProductCarouselListProps> = ({ options, items }) => {
  if (!options) {
    options = {
      dots: true,
      infinite: true,
      speed: 800,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      draggable: true,
      arrows: true,
      centerMode: false,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        }
      ]
    };
  }

  return (
    <div className='slick-wrapper'>
      <Slider {...options}>
        {items.map((item, index) => {
          return <ProductCarouselItem key={generateKey(String(index))} item={item} properties={['name', 'price']} array={['images']} />;
        })}
      </Slider>
    </div>
  );
};

export default ProductCarouselList;
