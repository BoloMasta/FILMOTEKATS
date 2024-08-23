import { Link } from "react-router-dom";
//import Icon from "./../Icon/Icon";
import SVG from "react-inlinesvg";
import styles from "./Logo.module.scss";

const Logo: React.FC = () => (
  <div className={styles.logoContainer}>
    <Link className={styles.logo} to="/" style={{ textDecoration: "none" }}>
      {/* <Icon id="header-icon" width="24" height="24" /> */}
      <SVG src="/images/icons/header-icon.svg" className={styles.icon} />
      <span className={styles.title}>Filmoteka</span>
    </Link>
  </div>
);

export default Logo;
