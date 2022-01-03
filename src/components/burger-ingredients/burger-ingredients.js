import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { BurgerIngredientsBlock } from './burger-ingridients-block';

function BurgerIngredients({ingredients, onModalOpen}) {
    const [current, setCurrent] = React.useState('Булки');
    return (
        <section className={burgerIngredientsStyles.container}>
            <h1 className='text text_type_main-large text_color_primary mb-5'>Соберите бургер</h1>
            <div className={burgerIngredientsStyles.tabs}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <ul className={burgerIngredientsStyles.list}>
                <BurgerIngredientsBlock ingredients={ingredients} type='bun' name='Булки' onClick={onModalOpen} />
                <BurgerIngredientsBlock ingredients={ingredients} type='sauce' name='Соусы' onClick={onModalOpen} />
                <BurgerIngredientsBlock ingredients={ingredients} type='main' name='Начинки' onClick={onModalOpen}/>
            </ul>
            <div className={burgerIngredientsStyles.totalWrapper}>
            <p className={burgerIngredientsStyles.price}>
                    <span className='text text_type_digits-medium'>610</span> <CurrencyIcon type="primary" />
                </p>
                <Button type="primary" size="medium">Оформить заказ</Button>
            </div>
        </section>
    )
};

burgerIngredientsStyles.propTypes = {
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
    onModalOpen: PropTypes.func.isRequired
}

export default BurgerIngredients;