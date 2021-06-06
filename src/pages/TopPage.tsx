import ProductBestSeller from '../components/ProductBestSellter';
import ProductRecent from '../components/ProductRecent';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';
import Main from '../layouts/Main';
import Offer from '../layouts/Offer';
import Section from '../layouts/Section';

export interface TopPageProps {}

const TopPage: React.FC<TopPageProps> = () => {
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
