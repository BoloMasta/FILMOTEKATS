import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Navigation from "../../components/Navigation/Navigation";
import SearchForm from "../../components/SearchForm/SearchForm";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch";
import Button from "../../components/Button/Button";
import styles from "./Header.module.scss";
import { useStore } from "../../utils/store";

const Header: React.FC = () => {
  const location = useLocation();
  const { view, setView } = useStore((state) => ({
    view: state.view,
    setView: state.setView,
  }));

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? "light" : "dark";
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setIsDarkTheme(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/library") {
      setView("queue");
    } else {
      setView(null);
    }
  }, [location.pathname, setView]);

  return (
    <header>
      <div className={styles.container}>
        <Logo />
        <Navigation />
        <div className={styles.controlsWrapper}>
          {location.pathname === "/library" ? (
            <div className={styles.libraryControls}>
              <Button
                onClick={() => setView("queue")}
                label="Queue"
                variant={view === "queue" ? "primary" : "secondary"}
                className={styles.button}
              />
              <Button
                onClick={() => setView("watched")}
                label="Watched"
                variant={view === "watched" ? "primary" : "secondary"}
                className={styles.button}
              />
            </div>
          ) : (
            <SearchForm />
          )}
        </div>
        <ThemeSwitch isDarkTheme={isDarkTheme} onToggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;
