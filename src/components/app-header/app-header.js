
import headerStyles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import MobileLogo from '../ui/mobile-logo/mobile-logo';
import BurgerMenu from '../ui/burger-menu/burger-menu';

function AppHeader({isMenuOpen}) {
    return (
    <header className={headerStyles.header}>
        <div className={headerStyles.contentWrapper}>
            <MobileLogo />
            <BurgerMenu isMenuOpen={isMenuOpen} />
            <nav className={headerStyles.nav}>
                <a href='#' className={headerStyles.link}>
                    <BurgerIcon type="primary" />
                    <span className='text text text_type_main-default'>Конструктор</span>
                </a>
                <a href='#' className={headerStyles.link}>
                    <ListIcon type="secondary" />
                    <span className='text text text_type_main-default'>Лента заказов</span>
                </a>
            </nav>
            <span className={headerStyles.logo}><Logo /></span>
            <button className={headerStyles.button}>
                <ProfileIcon type="secondary" />
                <span className='text text text_type_main-default'>Личный кабинет</span>
            </button>
        </div>
    </header>
    )
};

export default AppHeader;