import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById("react-modals");

const ModalOverlay = ({onClose}) => {
    return ReactDOM.createPortal(
        <div className={modalOverlayStyles.overlay} onClick={onClose}></div>,
        modalRoot
    )
};

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default ModalOverlay;