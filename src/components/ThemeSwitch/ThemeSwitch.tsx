import { ThemeSwitchProps } from "../../ts/types/componentProps";
import styles from "./ThemeSwitch.module.scss";

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ isDarkTheme, onToggleTheme }) => (
  <div className={styles.themeSwitch}>
    <span className={styles.themeLabel}>Change theme:</span>
    <label className={styles.themeSwitchContainer}>
      <input
        type="checkbox"
        checked={isDarkTheme}
        onChange={onToggleTheme}
        data-theme={isDarkTheme ? "dark" : "light"}
      />
      <div className={styles.slider}></div>
    </label>
  </div>
);

export default ThemeSwitch;
