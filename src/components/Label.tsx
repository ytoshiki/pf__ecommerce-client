import '../styles/components/Label.scss';

export interface LabelProps {
  size: number;
  title: string;
  sub: string;
}

const Label: React.FC<LabelProps> = ({ size, title, sub }) => {
  let heading: any;

  if (size === 1) {
    heading = (
      <h1 className='c-label-1'>
        <span>{title}</span>
        <small>{sub}</small>
      </h1>
    );
  } else if (size === 2) {
    heading = (
      <h2 className='c-label-1'>
        <span>{title}</span>
        <small>{sub}</small>
      </h2>
    );
  }

  return heading;
};

export default Label;
