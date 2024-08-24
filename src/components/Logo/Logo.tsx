import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";
import styles from "./Logo.module.scss";

const Logo: React.FC = () => (
  <div className={styles.logoContainer}>
    <Link className={styles.logo} to="/" style={{ textDecoration: "none" }}>
      <div className={styles.logoIconWrapper}>
          <SVG src="/images/icons/header-icon.svg" className={styles.logoIcon} />
          <SVG src="/images/icons/header-icon.svg" className={styles.logoIcon} />               
      </div>
      <span className={styles.title}>Filmoteka</span>
    </Link>
  </div>
);

export default Logo;
