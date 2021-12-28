
import headerStyles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
    <header className={headerStyles.header}>
        <nav className={headerStyles.nav}>
            <a href='' className={headerStyles.link}>
                <BurgerIcon type="primary" />
                <span className='text text text_type_main-default'>Конструктор</span>
            </a>
            <a href='' className={headerStyles.link}>
                <ListIcon type="secondary" />
                <span className='text text text_type_main-default'>Лента заказов</span>
            </a>
        </nav>
        <span><Logo /></span>
        <button className={headerStyles.button}>
            <ProfileIcon type="secondary" />
            <span className='text text text_type_main-default'>Личный кабинет</span>
        </button>
    </header>)

};

export default AppHeader;