import '../styles/layouts/PageHeader.scss';

export interface PageHeaderProps {
  image: string;
  name: string;
  paragraph?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ image, name, paragraph }) => {
  return (
    <div className='l-page-header'>
      <div className='l-page-header__bg' style={{ backgroundImage: `url(${image})` }}></div>
      <div className='l-page-header__inner'>
        {name ? <h1>{name}</h1> : false}
        {paragraph ? <h2>{paragraph}</h2> : false}
      </div>
    </div>
  );
};

export default PageHeader;
