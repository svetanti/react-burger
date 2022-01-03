import modalStyles from './modal.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById("react-modals");

const Modal = ({header, children, onClose}) => {
    return ReactDOM.createPortal(
        <div className={modalStyles.wrapper}>
            <div className={modalStyles.header}>
                <h3 className="text text_type_main-large">{header}</h3>
                <CloseIcon type="primary" onClick={onClose}/>
            </div>
            {children}
        </div>,
        modalRoot
    )
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element,
    header: PropTypes.string
};

export default Modal;