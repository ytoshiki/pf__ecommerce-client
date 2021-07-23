import { useEffect } from 'react';
import { connect } from 'react-redux';
import { dispatchfetchCategories } from '../store/actions/category.action';
import { dispatchCloseMenu } from '../store/actions/option.action';
import '../styles/components/Slidebar.scss';
import { CategoryData } from '../types/store/categories/stateTypes';
import { storeTypes } from '../types/store/storeTypes';
import { Link } from 'react-router-dom';
import { generateKey } from '../utils/generateKey';

export interface SlideBarMenuProps {
  categories: CategoryData[];
  fetchCategories: () => void;
  menu: boolean;
  closeMenu: () => void;
}

const SlideBarMenu: React.FC<SlideBarMenuProps> = ({ categories, fetchCategories, menu, closeMenu }) => {
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);
  return (
    <>
      <div className={`c-slidebar-menu ${menu ? 'is-visible' : ''}`}>
        <div className='c-slidebar-menu__inner'>
          <ul className='c-slidebar-menu__list'>
            {categories.length > 0 &&
              categories.map((category) => {
                return (
                  <li className='c-slidebar-menu__item' key={generateKey((category as any).id)}>
                    <Link to={`/collections/${(category as any).id}`}>{(category as any).name}</Link>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      {menu && <div className='PageOverlay' onClick={closeMenu}></div>}
    </>
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    categories: store.categories.categories,
    menu: store.option.menu
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCategories: () => dispatch(dispatchfetchCategories()),
    closeMenu: () => dispatch(dispatchCloseMenu())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SlideBarMenu);
