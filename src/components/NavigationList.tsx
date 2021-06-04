import { generateKey } from '../utils/generateKey';
import NavigationItem from './NavigationItem';
import '../styles/layouts/Navigation.scss';

export interface NavigationListProps {
  items: any[];
  property?: string;
  link?: string;
}

const NavigationList: React.FC<NavigationListProps> = ({ items, property, link }) => {
  return (
    <ul className='l-navigation__list'>
      {items.map((item, index) => {
        return <NavigationItem key={generateKey(String(index))} item={item} property={property && property} link={link && link} />;
      })}
    </ul>
  );
};

export default NavigationList;
