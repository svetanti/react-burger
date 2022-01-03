import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import burgerIngredientsStyles from './burger-ingredients.module.css';

export function BurgerIngredientsBlock({ingredients, type, name, onClick}) {
    return (
    <li onClick={onClick}>
        <h2 className='text text_type_main-medium text_color_primary'>{name}</h2>
            <div className={burgerIngredientsStyles.grid}>
                {
                    ingredients.filter(item => item.type === type).map((el, index) => (
                        <div className={burgerIngredientsStyles.item} key={el._id}>
                            <Counter count={1} size="default" />
                            <img src={el.image} className={burgerIngredientsStyles.image} alt={el.name} />
                            <p className={burgerIngredientsStyles.price}>
                                <span className='text text_type_digits-default'>{el.price}</span> <CurrencyIcon type="primary" />
                            </p>
                            <p className={`${burgerIngredientsStyles.text} text text_type_main-default`}>{el.name}</p>
                        </div>
                ))}               
            </div>
    </li>)
};

BurgerIngredientsBlock.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        "_id": PropTypes.string.isRequired,
        "name": PropTypes.string.isRequired,
        "type": PropTypes.string.isRequired,
        "proteins": PropTypes.number.isRequired,
        "fat": PropTypes.number.isRequired,
        "carbohydrates": PropTypes.number.isRequired,
        "calories": PropTypes.number.isRequired,
        "price": PropTypes.number.isRequired,
        "image": PropTypes.string.isRequired,
        "image_mobile": PropTypes.string.isRequired,
        "image_large": PropTypes.string.isRequired,
        "__v": PropTypes.number.isRequired
     })
    ),
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};