import React, { FC } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onClose: () => void;
}

const ModalOverlay:FC<TModalOverlayProps> = ({ onClose }) => (
  <div
    className={modalOverlayStyles.overlay}
    role="presentation"
    onClick={onClose}
    onKeyDown={onClose}
  />
);

export default ModalOverlay;
