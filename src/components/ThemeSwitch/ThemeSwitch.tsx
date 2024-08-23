import React from "react";
import styles from "./ThemeSwitch.module.scss";

interface ThemeSwitchProps {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isDarkTheme, onToggleTheme }) => (
  <div className={styles.themeSwitch}>
    <span className={styles.themeLabel}>Change theme:</span>
    <label className={styles.themeSwitchContainer}>
      <input type="checkbox" checked={isDarkTheme} onChange={onToggleTheme} />
      <div className={styles.slider}></div>
    </label>
  </div>
);

export default ThemeSwitch;
