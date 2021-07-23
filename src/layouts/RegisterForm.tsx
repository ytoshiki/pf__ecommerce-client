import { useState } from 'react';
import { connect } from 'react-redux';
import { dispatchRegisterCustomer } from '../store/actions/customer.action';

export interface RegisterFormType {
  username: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  nat: string;
}

export interface RegisterFormProps {
  dispatchRegister: (form: RegisterFormType) => any;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ dispatchRegister }) => {
  const [registerForm, setRegisterForm] = useState<RegisterFormType>({
    username: '',
    email: '',
    password: '',
    age: 0,
    gender: '',
    nat: ''
  });

  const [formError, setFormError] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    nat: ''
  });

  const [reqError, setReqError] = useState('');

  const natValues = ['GB', 'FR', 'DK', 'NO', 'NL', 'US', 'NZ', 'FI', 'ES', 'CA', 'BR', 'AU', 'JP'];

  const natOptions = ['The U.K', 'France', 'Denmark', 'Norway', 'The Netherlands', 'The U.S', 'New Zealand', 'Finland', 'Spain', 'Canada', 'Brazil', 'Australia', 'Japan'];

  const onChange = (e: any) => {
    const key = e.target.name as 'username' | 'email' | 'password' | 'age' | 'gender' | 'nat';

    if (key === 'age') {
      setRegisterForm({
        ...registerForm,
        [key]: Number(e.target.value)
      });
    } else {
      setRegisterForm({
        ...registerForm,
        [key]: e.target.value
      });
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setFormError({
      username: '',
      email: '',
      password: '',
      age: '',
      gender: '',
      nat: ''
    });

    const errors = Object.create(null);
    const errorChecker = Object.entries(registerForm);
    errorChecker.forEach((option) => {
      if (!option[1]) {
        errors[option[0]] = `${option[0]} is required.`;
      }

      if (option[0] === 'password' && (option[1] as string).length < 6) {
        errors[option[0]] = `At least 6 characters are required.`;
      }
    });

    if (Object.keys(errors).length > 0) {
      return setFormError(errors);
    }

    const result = await dispatchRegister(registerForm);

    if (!result) {
      setReqError('Username is already taken. Try another one');
    }
  };

  return (
    <form action='' onSubmit={onSubmit} className='c-register__form'>
      {reqError && <span className='c-register__error'>{reqError}</span>}
      <div className='c-register__block'>
        <input type='text' placeholder='Username' name='username' onChange={onChange} />
        {formError.username && <span className='c-register__error'>{formError.username}</span>}
      </div>
      <div className='c-register__block'>
        <input type='email' placeholder='Email' name='email' onChange={onChange} />
        {formError.email && <span className='c-register__error'>{formError.email}</span>}
      </div>
      <div className='c-register__block'>
        <input type='password' placeholder='Password' name='password' onChange={onChange} />
        {formError.password && <span className='c-register__error'>{formError.password}</span>}
      </div>
      <div className='c-register__block'>
        <input type='number' placeholder='Age' name='age' onChange={onChange} min='17' max='100' />
        {formError.age && <span className='c-register__error'>{formError.age}</span>}
      </div>
      <div className='c-register__block'>
        <select name='gender' onChange={onChange}>
          <option value=''>--Gender--</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
        {formError.gender && <span className='c-register__error'>{formError.gender}</span>}
      </div>
      <div className='c-register__block'>
        <select name='nat' onChange={onChange}>
          <option value=''>--nationality--</option>
          {natOptions.map((nat, index) => {
            return (
              <option key={nat} value={natValues[index]}>
                {nat}
              </option>
            );
          })}
        </select>
        {formError.nat && <span className='c-register__error'>{formError.nat}</span>}
      </div>
      <button className='c-register__button'>Register</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchRegister: (form: RegisterFormType) => dispatch(dispatchRegisterCustomer(form))
  };
};

export default connect(null, mapDispatchToProps)(RegisterForm);
