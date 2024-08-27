import SVG from "react-inlinesvg";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>Copyright © 2023 Filmoteka. All rights reserved.</p>
        <p>
          Projekt i wykonanie:
          <a href="https://github.com/BoloMasta" target="_blank" rel="noopener noreferrer">
            <SVG
              src={`${import.meta.env.BASE_URL}images/icons/github-icon.svg`}
              className={styles.footerIcon}
            />
            BoloMasta
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
