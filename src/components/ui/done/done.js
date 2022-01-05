import doneStyles from './done.module.css';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import doneBgPath1 from '../../../images/done_bg_1.svg';
import doneBgPath2 from '../../../images/done_bg_2.svg';
import doneBgPath3 from '../../../images/done_bg_3.svg';

const Done = () => {
    return (
        <div className={doneStyles.done}>
            <img src={doneBgPath1} className={doneStyles.icon}/>
            <img src={doneBgPath2} className={doneStyles.icon}/>
            <img src={doneBgPath3} className={doneStyles.icon}/>
            <CheckMarkIcon type="primary"/>
        </div>
    )
};

export default Done;