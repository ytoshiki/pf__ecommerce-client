import '../styles/components/Button.scss';

export interface ButtonProps {}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className='c-button'>{children}</button>;
};

export default Button;
