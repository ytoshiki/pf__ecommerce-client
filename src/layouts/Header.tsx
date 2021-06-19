import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/layouts/Header.scss';
import BgImg1 from '../assets/main-header-01.jpg';
import BgImg2 from '../assets/main-header-02.jpg';
import BgImg3 from '../assets/main-header-03.jpg';
import BgImg4 from '../assets/main-header-04.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className='l-header'>
      <Carousel autoPlay={true} showArrows={false} showIndicators={false} infiniteLoop={true} showStatus={false} transitionTime={1200} interval={6000} stopOnHover={false}>
        <div className='l-header__bg' style={{ backgroundImage: `url(${BgImg3})` }}></div>
        <div className='l-header__bg' style={{ backgroundImage: `url(${BgImg4})` }}></div>
        <div className='l-header__bg' style={{ backgroundImage: `url(${BgImg1})` }}></div>
        <div className='l-header__bg' style={{ backgroundImage: `url(${BgImg2})` }}></div>
      </Carousel>

      <div className='l-header__inner'>
        <h1>A Sense of Community</h1>
        <div className='l-header__button'>
          <Button>
            <Link to='/collections'>VIEW THE COLLECTION</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
