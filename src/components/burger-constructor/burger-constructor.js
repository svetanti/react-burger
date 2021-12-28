import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css'
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor({ingredients}) {
const bun = ingredients.find(item => item.type === 'bun');
    return (
        <section className={burgerConstructorStyles.container}>
            <ul className={burgerConstructorStyles.list}>
                <li className={burgerConstructorStyles.ingredient}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>
                {ingredients.filter(item => item.type === 'main' || item.type === 'sauce').slice(1, ).map((el, index) => (
                    <li className={burgerConstructorStyles.ingredient} key={el._id}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            isLocked={false}
                            text={el.name}
                            price={el.price}
                            thumbnail={el.image}
                        />
                    </li>
                ))}
                <li className={burgerConstructorStyles.ingredient}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name}
                        price={bun.price}
                        thumbnail={bun.image}
                    />
                </li>
            </ul>
        </section>
    )
};

BurgerConstructor.propTypes = {
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
    )
};

export default BurgerConstructor;