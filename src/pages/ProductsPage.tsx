import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import ProductBestSeller from '../components/ProductBestSellter';
import ProductList from '../components/ProductList';
import ProductRecent from '../components/ProductRecent';

import Main from '../layouts/Main';
import Section from '../layouts/Section';
import { dispatchfetchCategories } from '../store/actions/category.action';
import { ProductApiTypes } from '../types/api/ProductApiTypes';

import { CategoryState } from '../types/store/categories/stateTypes';
import { storeTypes } from '../types/store/storeTypes';

export interface ProductsPageProps {
  categories: CategoryState[];
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
    let unmount = false;

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}products/category/${categoryId}`);
        const data = await response.data;

        if (!data.success) throw new Error(data.message);

        if (!data.products.length) throw new Error('Items Not Found');

        if (!unmount) {
          setProducts(data.products);
        }
      } catch (error) {
        setProducts([]);
      }
    };

    fetchProducts();

    const cleanup = () => {
      unmount = true;
    };

    return cleanup;
  }, [categoryId]);

  return (
    <Main>
      <Section>
        <div>
          <div style={{ backgroundImage: `url(${category.image})`, height: `400px` }}></div>
          {category.name ? <h1>{category.name}</h1> : false}
          {category.paragraph ? <h1>{category.paragraph}</h1> : false}
        </div>

        {products.length ? <ProductList items={products} /> : 'no items'}
        <ProductRecent />
        <ProductBestSeller />
      </Section>
    </Main>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
