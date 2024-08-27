import { useNavigate } from "react-router-dom";
import SVG from "react-inlinesvg";
import styles from "./Logo.module.scss";

const Logo: React.FC = () => {
  const navigate = useNavigate();
  const logoIconPath = `${import.meta.env.BASE_URL}images/icons/header-icon.svg`;

  const handleClick = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.logoContainer} onClick={handleClick}>
      <div className={styles.logo} style={{ textDecoration: "none", cursor: "pointer" }}>
        <div className={styles.logoIconWrapper}>
          <SVG src={logoIconPath} className={styles.logoIcon} />
          <SVG src={logoIconPath} className={styles.logoIcon} />
        </div>
        <span className={styles.title}>Filmoteka</span>
      </div>
    </div>
  );
};

export default Logo;
