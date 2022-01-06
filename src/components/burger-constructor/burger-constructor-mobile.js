import {ConstructorElementMobile} from './constructor-element-mobile';
import burgerConstructorStyles from './burger-constructor.module.css';
import PropTypes from 'prop-types';

export const BurgerConstructorMobile = ({ingredients}) => {
    const bun = ingredients && ingredients.find(item => item.type === 'bun');

    return (<>
        {bun && <ConstructorElementMobile
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}/>}

        <ul className={burgerConstructorStyles.list}>
            {ingredients.filter(item => item.type === 'main' || item.type === 'sauce').slice(1, ).map((el, index) => (
                <li className={burgerConstructorStyles.ingredient} key={el.id}>
                    <ConstructorElementMobile
                        text={el.name}
                        price={el.price}
                        thumbnail={el.image}
                    />
                </li>
            ))}
        </ul>
        {bun && <ConstructorElementMobile
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}/>}
    </>)
};

BurgerConstructorMobile.propTypes = {
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
     }))
};