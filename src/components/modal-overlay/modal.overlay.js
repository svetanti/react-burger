import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import modalOverlayStyles from './modal-overlay.module.css';

const modalRoot = document.getElementById('react-modals');

const ModalOverlay = ({ onClose }) => ReactDOM.createPortal(
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
