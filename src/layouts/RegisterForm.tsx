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

  const onSubmit = (e: any) => {
    e.preventDefault();

    const errors = Object.create(null);
    const errorChecker = Object.entries(registerForm);
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

    dispatchRegister(registerForm);

    setFormError({
      username: '',
      email: '',
      password: '',
      age: '',
      gender: '',
      nat: ''
    });
  };

  return (
    <form action='' onSubmit={onSubmit}>
      <div>
        <input type='text' placeholder='Username' name='username' onChange={onChange} />
        {formError.username && <span>{formError.username}</span>}
      </div>
      <div>
        <input type='email' placeholder='Email' name='email' onChange={onChange} />
        {formError.email && <span>{formError.email}</span>}
      </div>
      <div>
        <input type='password' placeholder='Password' name='password' onChange={onChange} />
        {formError.password && <span>{formError.password}</span>}
      </div>
      <div>
        <input type='number' placeholder='Age' name='age' onChange={onChange} min='10' max='100' />
        {formError.age && <span>{formError.age}</span>}
      </div>
      <div>
        <select name='gender' onChange={onChange}>
          <option value=''>--Gender--</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
        {formError.gender && <span>{formError.gender}</span>}
      </div>
      <div>
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
        {formError.nat && <span>{formError.nat}</span>}
      </div>
      <button>Register</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatchRegister: (form: RegisterFormType) => dispatch(dispatchRegisterCustomer(form))
  };
};

export default connect(null, mapDispatchToProps)(RegisterForm);
