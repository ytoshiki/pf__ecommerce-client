import { Link } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/layouts/Header.scss';
export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className='l-header'>
      <div className='l-header__inner'>
        <h1>A Sense of Community</h1>
        <Button>
          <Link to='/collection'>VIEW THE COLLECTION</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
