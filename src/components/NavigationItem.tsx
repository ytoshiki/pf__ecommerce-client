import { Link } from 'react-router-dom';

export interface NavigationItemProps {
  item: any;
  property?: string;
  link?: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item, property, link }) => {
  const returnedList = link ? (
    <li>
      <Link to={`/collections/${item[link]}`}>{property ? item[property] : item}</Link>
    </li>
  ) : (
    <li>{property ? item[property] : item}</li>
  );

  return returnedList;
};

export default NavigationItem;
