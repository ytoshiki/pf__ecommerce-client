import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/layouts/Footer.scss';
export interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className='l-footer'>
      <div className='l-footer__inner'>
        <div className='l-footer__top'>
          <div className='l-footer__block'>
            <div className='l-footer__label'>COMPANY</div>
            <ul className='l-footer__list'>
              <li className='l-footer__item'>About</li>
              <li className='l-footer__item'>FAQ</li>
              <li className='l-footer__item'>Contact</li>
              <li className='l-footer__item'>Privacy Policy</li>
              <li className='l-footer__item'>Terms of Service</li>
            </ul>
          </div>
          <div className='l-footer__block'>
            <div className='l-footer__label'>NEWSLETTER</div>
            <div className='l-footer__newsletter'>
              <input type='text' placeholder='Enter your email address' />
              <Button>
                <Link to=''>SUBSCRIBE</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className='l-footer__bottom'>
          <div className='l-footer__bottom-content'>
            <div className='l-footer__logo'>w</div>
            <p className='l-footer__copyright'>&copy; 2021 m.com</p>
            <p className='l-footer__email'>w@moffical.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
