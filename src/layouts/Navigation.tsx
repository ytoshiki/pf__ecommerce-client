import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavigationList from '../components/NavigationList';
import NavigationOptionList from '../components/NavigationOptionList';
import { dispatchfetchCategories } from '../store/actions/category.action';
import { CategoryState } from '../types/store/categories/stateTypes';
import { storeTypes } from '../types/store/storeTypes';

export interface NavigationProps {
  categories: CategoryState[];
  fetchCategories: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ categories, fetchCategories }) => {
  useEffect(() => {
    if (categories.length > 0) return;

    fetchCategories();
  }, [categories, fetchCategories]);

  return (
    <nav>
      {categories.length && <NavigationList items={categories} property='name' link='id' />}
      <div className='logo'>
        <Link to='/'>W</Link>
      </div>
      <NavigationOptionList />
    </nav>
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    categories: store.categories
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCategories: () => dispatch(dispatchfetchCategories())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
