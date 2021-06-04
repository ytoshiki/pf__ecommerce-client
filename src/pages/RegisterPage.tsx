import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import LoginForm from '../layouts/LoginForm';
import Main from '../layouts/Main';
import RegisterForm from '../layouts/RegisterForm';
import Section from '../layouts/Section';
import { storeTypes } from '../types/store/storeTypes';

export interface RegisterPageProps {
  customer: any;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ customer }) => {
  const [registerOption, setRegisterOption] = useState('login');
  const [isCustomerSet, setIsCustomerSet] = useState(false);

  useEffect(() => {
    if (customer.id) setIsCustomerSet(true);
  }, [customer]);

  const toggleOption = (option: string) => {
    setRegisterOption(option);
  };

  if (isCustomerSet) {
    return <Redirect to='/' />;
  }
  return (
    <Main>
      <Section>
        <div>
          <h1>{registerOption === 'login' ? 'Login' : 'Register'}</h1>
          <p>{registerOption === 'login' ? 'Please enter username and email' : 'Please fill in the information below'}</p>
          {registerOption === 'login' ? <LoginForm /> : <RegisterForm />}
          <div>
            {registerOption === 'login' ? (
              <span>
                Don't have an account? <button onClick={() => toggleOption('register')}>Create One</button>
              </span>
            ) : (
              <span>
                Already have an account? <button onClick={() => toggleOption('login')}>log in</button>
              </span>
            )}
          </div>
        </div>
      </Section>
    </Main>
  );
};

const mapStateToProps = (store: storeTypes) => {
  return {
    customer: store.customer
  };
};

export default connect(mapStateToProps)(RegisterPage);
