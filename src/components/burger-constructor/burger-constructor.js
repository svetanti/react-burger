import PropTypes from 'prop-types';
import burgerConstructorStyles from './burger-constructor.module.css'
import {ConstructorElement, DragIcon, CurrencyIcon, Button, CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorMobile } from './burger-constructor-mobile';

function BurgerConstructor({ingredients, onModalOpen, isTablet, isConstructorOpened, onCloseConstructor}) {
const bun = ingredients && ingredients.find(item => item.type === 'bun');
    return (
        <>
            {isConstructorOpened
                ? (<section className={burgerConstructorStyles.container}>
                    { isTablet
                        ? (<>
                            <div className={burgerConstructorStyles.mobilePanel}>
                                <span>Заказ</span>
                                <CloseIcon onClick={onCloseConstructor} />
                            </div>
                            <BurgerConstructorMobile ingredients={ingredients} />
                        </>)
                        : (<>
                            <div className={burgerConstructorStyles.ingridientWrapper}>
                                {bun && (
                                <ConstructorElement
                                    type="top"
                                    isLocked={true}
                                    text={bun.name}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                />)}          
                            </div>
                            <ul className={burgerConstructorStyles.list}>
                                {ingredients.filter(item => item.type === 'main' || item.type === 'sauce').slice(1, ).map((el, index) => (
                                    <li className={burgerConstructorStyles.ingredient} key={el.id}>
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            isLocked={false}
                                            text={el.name}
                                            price={el.price}
                                            thumbnail={el.image}
                                        />
                                    </li>
                                ))}
                            </ul>
                            <div className={burgerConstructorStyles.ingridientWrapper}>
                            {bun && (<ConstructorElement
                                    type="bottom"
                                    isLocked={true}
                                    text={bun.name}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                />)}
                            </div>
                        </>)
                    }
                        <div className={burgerConstructorStyles.totalWrapper}>
                            <p className={burgerConstructorStyles.price}>
                                <span className='text text_type_digits-medium'>610</span> <CurrencyIcon type="primary" />
                            </p>
                            <Button type="primary" size="medium" onClick={onModalOpen}>{isTablet ? 'Заказать' : 'Оформить заказ'}</Button>
                        </div>   
                </section>)
                : <></>}
        </>)
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
    ),
    onModalOpen: PropTypes.func.isRequired,
    isTablet: PropTypes.bool.isRequired,
    isConstructorOpened: PropTypes.bool.isRequired,
    onCloseConstructor: PropTypes.func.isRequired
};

export default BurgerConstructor;