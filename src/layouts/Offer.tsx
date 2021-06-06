import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/layouts/Offer.scss';

export interface OfferProps {}

const Offer: React.FC<OfferProps> = () => {
  return (
    <div className='l-offer'>
      <div className='l-offer__inner'>
        <small>NEWSLETTER</small>
        <h3>Our Design News in Your Inbox</h3>
        <Button>
          <Link to='/register'>Join Us</Link>
        </Button>
      </div>
    </div>
  );
};

export default Offer;
