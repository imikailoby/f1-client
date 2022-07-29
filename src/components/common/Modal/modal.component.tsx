import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import closeIcon from '../../../assets/icons/close.svg';
import styles from './modal.module.scss';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = (props: Props) => {
  const { children, onClose } = props;

  const renderModal = () => (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <button onClick={onClose} className={styles.close}>
          <img src={closeIcon} alt='close icon' />
        </button>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(renderModal(), document.body);
};

export default Modal;
