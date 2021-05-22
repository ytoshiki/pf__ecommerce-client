import ProductBestSeller from '../components/ProductBestSellter';
import ProductRecent from '../components/ProductRecent';
import Main from '../layouts/Main';
import Section from '../layouts/Section';

export interface TopPageProps {}

const TopPage: React.FC<TopPageProps> = () => {
  return (
    <Main>
      <Section>
        <h1>Top</h1>
      </Section>
      <Section>
        <ProductBestSeller />
      </Section>
      <Section>
        <ProductRecent />
      </Section>
    </Main>
  );
};

export default TopPage;
