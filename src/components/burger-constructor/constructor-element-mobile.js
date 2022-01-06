import { CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

export const ConstructorElementMobile  = ({ text, thumbnail, price }) => {
    return (
        <div className={burgerConstructorStyles.mobileWrapper}>
            <DragIcon type="primary" />
            <div className={burgerConstructorStyles.ingredientContent}>
                <img src={thumbnail} alt={text} className={burgerConstructorStyles.img} />
                <span className={burgerConstructorStyles.text}>{text}</span>
                <span className={burgerConstructorStyles.price}>
                    {price}
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    );
};

ConstructorElementMobile.propTypes = {
    text: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};