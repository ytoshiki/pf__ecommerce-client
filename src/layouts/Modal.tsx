import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import '../styles/components/Modal.scss';

export interface ModalProps {
  isOpen: boolean;
  toggleOpen: (state: boolean) => void;
}

Modal.setAppElement('#root');

const SimpleModal: React.FC<ModalProps> = ({ isOpen, toggleOpen }) => {
  return (
    <Modal isOpen={isOpen} contentLabel='Example Modal' className='c-modal' overlayClassName='c-modal__overlay'>
      <button onClick={() => toggleOpen(!isOpen)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className='c-modal__inner'>
        <p className='c-modal__p'>Oops. you haven't signed in.</p>
        <p className='c-modal__offer'>
          <Link to='/register'>Register an account</Link> to proceed
        </p>
      </div>
    </Modal>
  );
};

export default SimpleModal;
