import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.scss";

const Navigation: React.FC = () => (
  <nav className={styles.navigation}>
    <ul className={styles.navigationList}>
      <li className={styles.navigationItem}>
        <Link className={styles.activeLink} to="/">
          Home
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link className={styles.link} to="/library">
          My Library
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
