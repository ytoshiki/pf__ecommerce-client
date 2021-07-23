import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import PageHeader from '../layouts/PageHeader';
import ProductBestSeller from '../components/ProductBestSellter';
import ProductList from '../components/ProductList';
import ProductRecent from '../components/ProductRecent';
import Main from '../layouts/Main';
import Section from '../layouts/Section';
import { dispatchfetchCategories } from '../store/actions/category.action';
import { ProductApiTypes } from '../types/api/ProductApiTypes';
import { CategoryData } from '../types/store/categories/stateTypes';
import { storeTypes } from '../types/store/storeTypes';
import Footer from '../layouts/Footer';
import '../styles/components/Error.scss';

export interface ProductsPageProps {
  categories: CategoryData[];
  fetchCategories: () => any;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ categories, fetchCategories }) => {
  const params = useParams();
  const categoryId = (params as any).id;

  const [products, setProducts] = useState<ProductApiTypes[]>([]);
  const [category, setCategory] = useState<{ name: string; image: string; paragraph: string | null }>({
    name: '',
    image: '',
    paragraph: null
  });

  useEffect(() => {
    let mounted = true;

    const fetchAPI = async () => {
      try {
        const resCategories = await fetchCategories();
        resCategories.forEach((category: any) => {
          if (category.id === categoryId) {
            setCategory({
              name: category.name,
              image: category.image,
              paragraph: category.paragrpah
            });
          }
        });
      } catch (error) {}
    };

    if (mounted) fetchAPI();

    return () => {
      mounted = false;
    };
  }, [categoryId, fetchCategories]);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}products/category/${categoryId}`);
        const data = await response.data;

        if (!data.success) throw new Error(data.message);

        if (!data.products.length) {
          setProducts([]);
          throw new Error('Items Not Found');
        }

        if (mounted) {
          setProducts(data.products);
        }
      } catch (error) {
        setProducts([]);
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, [categoryId, setProducts]);

  const scrollEvent = (e: any) => {
    const navigation = document.querySelector('.l-navigation');
    if (!navigation) return;

    if (window.scrollY === 0) {
      navigation.classList.remove('is-scroll');
    } else {
      navigation.classList.add('is-scroll');
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      window.addEventListener('scroll', scrollEvent);
    }

    return () => {
      mounted = false;
      const navigation = document.querySelector('.l-navigation');
      if (navigation) {
        navigation.classList.remove('is-scroll');
      }

      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  console.log({ products });

  return (
    <Main>
      <PageHeader image={category.image} name={category.name} paragraph={category.paragraph ? (category.paragraph as string) : ''} />
      <Section size='is-bottom'>{products.length > 0 ? <ProductList items={products} /> : <div className='c-error'>Sorry, there are no items in this category. </div>}</Section>
      <Section>
        <ProductRecent />
      </Section>
      <Section>
        <ProductBestSeller />
      </Section>
      <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
