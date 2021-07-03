import Main from '../layouts/Main';
import Section from '../layouts/Section';
import Footer from '../layouts/Footer';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { storeTypes } from '../types/store/storeTypes';
import { CustomerData } from '../types/store/customer/stateTypes';
import Label from '../components/Label';
import { Redirect } from 'react-router';
import PurchaseHistoryList from '../components/PurchaseHistoryList';

export interface ReviewPageProps {
  customer: CustomerData;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ customer }) => {
  const [userExist, setUserExist] = useState(true);

  useEffect(() => {
    const navigation = document.querySelector('.l-navigation');
    if (!navigation) return;

    navigation.classList.add('is-scroll');

    return () => {
      navigation.classList.remove('is-scroll');
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (!customer.id) {
      if (mounted) setUserExist(false);
    }

    return () => {
      mounted = false;
    };
  }, [customer.id, customer.purchasedItems]);

  const renderReviewList = () => {
    if (customer.purchasedItems.length > 0) {
      return <PurchaseHistoryList purchaseItems={customer.purchasedItems} />;
    } else {
      return <p>No purchase history</p>;
    }
  };

  return userExist ? (
    <Main>
      <Section size='is-xlg'>
        <Label size={1} title='Purchase History' sub='' />
        <div className='l-container'>{renderReviewList()}</div>
      </Section>

      <Footer />
    </Main>
  ) : (
    <Redirect to='/' />
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    customer: store.customer
  };
};

export default connect(mapStateToProps)(ReviewPage);
