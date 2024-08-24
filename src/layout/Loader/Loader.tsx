import SVG from "react-inlinesvg";
import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.loaderIconWrapper}>
                <SVG src="/images/icons/header-icon.svg" className={styles.loaderIcon} />
                <SVG src="/images/icons/header-icon.svg" className={styles.loaderIcon} />               
            </div>
        </div>
    );
}

export default Loader;
