import SVG from "react-inlinesvg";
import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
  const logoIconPath = `${import.meta.env.BASE_URL}images/icons/header-icon.svg`;

  return (
    <div className={styles.loader}>
      <div className={styles.loaderIconWrapper}>
        <SVG src={logoIconPath} className={styles.loaderIcon} />
        <SVG src={logoIconPath} className={styles.loaderIcon} />
      </div>
    </div>
  );
};

export default Loader;
