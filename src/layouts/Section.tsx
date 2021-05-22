export interface SectionProps {}

const Section: React.FC<SectionProps> = ({ children }) => {
  return <section>{children}</section>;
};

export default Section;
