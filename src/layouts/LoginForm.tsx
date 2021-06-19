import { useState } from 'react';
import { connect } from 'react-redux';
import { dispatchLoginCustomer } from '../store/actions/customer.action';

interface LoginFormType {
  username: string;
  password: string;
}

export interface LoginFormProps {
  dispatchLogin: (form: LoginFormType) => any;
}

const LoginForm: React.FC<LoginFormProps> = ({ dispatchLogin }) => {
  const [signInForm, setSignInForm] = useState({
    username: '',
    password: ''
  });

  const [formError, setFormError] = useState({
    username: '',
    password: ''
  });

  const [reqError, setReqError] = useState('');

  const onChange = (e: any) => {
    const key = e.target.name as 'username' | 'password';
    setSignInForm({
      ...signInForm,
      [key]: e.target.value
    });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const errors = Object.create(null);
    const errorChecker = Object.entries(signInForm);
    errorChecker.forEach((option) => {
      if (!option[1]) {
        errors[option[0]] = `${option[0]} is required.`;
      }

      if (option[0] === 'password' && (option[1] as string).length < 6) {
        errors[option[0]] = `At least 6 characters is required.`;
      }
    });

    if (Object.keys(errors).length > 0) {
      return setFormError(errors);
    }

    setFormError({
      username: '',
      password: ''
    });

    const result = await dispatchLogin(signInForm);
    if (!result) {
      return setReqError('Either email or password is wrong. Please try again.');
    }

    if (reqError) setReqError('');
  };

  return (
    <form action='' onSubmit={onSubmit} className='c-register__form'>
      {reqError && <span className='c-register__error'>{reqError}</span>}
      <div className='c-register__block'>
        <input type='text' placeholder='Username' name='username' onChange={onChange} />
        {formError.username && <span className='c-register__error'>{formError.username}</span>}
      </div>
      <div className='c-register__block'>
        <input type='password' placeholder='Password' name='password' onChange={onChange} />
        {formError.password && <span className='c-register__error'>{formError.password}</span>}
      </div>
      <button className='c-register__button'>Login</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchLogin: (form: LoginFormType) => dispatch(dispatchLoginCustomer(form))
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
