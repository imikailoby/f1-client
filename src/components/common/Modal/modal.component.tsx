import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
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
        <button onClick={onClose}>close</button>
        {children}
      </div>
    </div>
  );

  return (ReactDOM.createPortal(renderModal(), document.body));
};

export default Modal;
