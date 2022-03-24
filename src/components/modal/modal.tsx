import React, { FC, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

type TModalProps = {
  onClose: () => void;
  header: string;
  headerStyle?: string;
};

const modalRoot = document.getElementById('react-modals') as HTMLElement;

const Modal:FC<TModalProps> = ({
  header, children, headerStyle, onClose,
}) => {
  useEffect(() => {
    function closeOnEsc(e: { key: string; }) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        onClose();
      }
    }
    document.addEventListener('keyup', closeOnEsc);

    return () => {
      document.removeEventListener('keyup', closeOnEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={modalStyles.wrapper} id="modal">
        <div className={modalStyles.header} id="modalHeader">
          <h3 className={headerStyle || modalStyles.title}>{header}</h3>
          <span id="close">
            <CloseIcon type="primary" onClick={onClose} />
          </span>
        </div>
        {children}
      </div>
    </>,
    modalRoot,
  );
};

export default Modal;
