import '../styles/layouts/Section.scss';

export interface SectionProps {
  size?: string;
}

const Section: React.FC<SectionProps> = ({ children, size }) => {
  return <section className={`${size ? size : ''} l-section`}>{children}</section>;
};

export default Section;
