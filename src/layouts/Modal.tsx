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
      <button onClick={() => toggleOpen(!isOpen)}>close</button>
      <div>
        <p>It seems you have not signed in yet.</p>
        <p>
          <Link to='/register'>Register an account</Link>
        </p>
      </div>
    </Modal>
  );
};

export default SimpleModal;
