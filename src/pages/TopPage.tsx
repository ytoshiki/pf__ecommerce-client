import { useEffect } from 'react';
import ProductBestSeller from '../components/ProductBestSellter';
import ProductRecent from '../components/ProductRecent';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import Main from '../layouts/Main';
import Offer from '../layouts/Offer';
import Section from '../layouts/Section';

export interface TopPageProps {}

const TopPage: React.FC<TopPageProps> = () => {
  const scrollEvent = (e: any) => {
    const navigation = document.querySelector('.l-navigation');
    if (!navigation) return;

    if (window.scrollY === 0) {
      navigation.classList.remove('is-scroll');
    }
    if (window.scrollY > 600) {
      navigation.classList.add('is-scroll');
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      window.addEventListener('scroll', scrollEvent);
    }

    return () => {
      console.log('called');
      mounted = false;
      const navigation = document.querySelector('.l-navigation');
      if (navigation) {
        navigation.classList.remove('is-scroll');
      }

      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  return (
    <Main>
      <Header />
      <Section>
        <ProductBestSeller />
      </Section>
      <Section>
        <ProductRecent />
      </Section>
      <Offer />
      <Footer />
    </Main>
  );
};

export default TopPage;
