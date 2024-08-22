import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>Copyright © 2023 Filmoteka. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
