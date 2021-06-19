import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import LoginForm from '../layouts/LoginForm';
import Main from '../layouts/Main';
import RegisterForm from '../layouts/RegisterForm';
import Section from '../layouts/Section';
import { storeTypes } from '../types/store/storeTypes';
import '../styles/pages/Register.scss';
import Footer from '../layouts/Footer';

export interface RegisterPageProps {
  customer: any;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ customer }) => {
  const [registerOption, setRegisterOption] = useState('login');
  const [isCustomerSet, setIsCustomerSet] = useState(false);

  useEffect(() => {
    if (customer.id) setIsCustomerSet(true);
  }, [customer]);

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

  const toggleOption = (option: string) => {
    setRegisterOption(option);
  };

  if (isCustomerSet) {
    return <Redirect to='/' />;
  }
  return (
    <Main>
      <Section>
        <div className='c-register'>
          <div className='c-register__inner'>
            <h1 className='c-register__heading'>{registerOption === 'login' ? 'Login' : 'Register'}</h1>
            <p className='c-register__para'>{registerOption === 'login' ? 'Please enter username and email' : 'Please fill in the information below'}</p>
            {registerOption === 'login' ? <LoginForm /> : <RegisterForm />}
            <div className='c-register__option'>
              {registerOption === 'login' ? (
                <div>
                  Don't have an account? <button onClick={() => toggleOption('register')}>Create One</button>
                </div>
              ) : (
                <div>
                  Already have an account? <button onClick={() => toggleOption('login')}>log in</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
      <Footer />
    </Main>
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    customer: store.customer
  };
};

export default connect(mapStateToProps)(RegisterPage);
