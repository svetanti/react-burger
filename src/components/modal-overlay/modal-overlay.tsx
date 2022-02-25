import React, { FC } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import modalOverlayStyles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClose: () => void;
}

const modalRoot = document.getElementById('react-modals') as HTMLElement;

const ModalOverlay:FC<TModalOverlayProps> = ({ onClose }) => ReactDOM.createPortal(
  <div
    className={modalOverlayStyles.overlay}
    role="presentation"
    onClick={onClose}
    onKeyDown={onClose}
  />,
  modalRoot,
);

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
