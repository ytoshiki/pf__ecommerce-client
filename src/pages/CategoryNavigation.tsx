import { useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../layouts/Footer';
import Main from '../layouts/Main';
import Section from '../layouts/Section';
import { dispatchfetchCategories } from '../store/actions/category.action';
import { CategoryData } from '../types/store/categories/stateTypes';
import { storeTypes } from '../types/store/storeTypes';
import { Link } from 'react-router-dom';
import { generateKey } from '../utils/generateKey';
import '../styles/pages/CategoryNavigation.scss';

export interface CategoryNavigationPageProps {
  categories: CategoryData[];
  fetchCategories: () => void;
}

const CategoryNavigationPage: React.FC<CategoryNavigationPageProps> = ({ categories, fetchCategories }) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const navigation = document.querySelector('.l-navigation');
      if (navigation) {
        navigation.classList.add('is-scroll');
      }
    }

    return () => {
      mounted = false;
      const navigation = document.querySelector('.l-navigation');
      if (navigation) {
        navigation.classList.remove('is-scroll');
      }
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) fetchCategories();

    return () => {
      mounted = false;
    };
  }, [fetchCategories]);

  console.log(categories);
  return (
    <Main>
      <Section>
        <div className='c-categoryNavigation'>
          <h1 className='c-categoryNavigation__heading'>All Collections</h1>
          <div className='c-categoryNavigation__content'>
            {categories.length > 0 && (
              <ul className='c-categoryNavigation__list'>
                {categories.map((category: any, index) => {
                  return (
                    <li key={generateKey(String(index))} className='c-categoryNavigation__item'>
                      <Link to={`/collections/${category.id}`}>
                        <div style={{ backgroundImage: `url(${category.image})` }} className='c-categoryNavigation__block'>
                          <div className='c-categoryNavigation__name'>{category.name}</div>
                          <div className='c-categoryNavigation__button'>
                            <button>
                              <span>VIEW PRODUCTS</span>
                            </button>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </Section>
      <Section>
        <Footer />
      </Section>
    </Main>
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    categories: store.categories.categories
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchCategories: () => dispatch(dispatchfetchCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryNavigationPage);
