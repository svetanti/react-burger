import mainStyles from './main.module.css';

function Main(props) {
    return (
        <div className={mainStyles.main}>
            {props.children}
        </div>
    )
};

export default Main;