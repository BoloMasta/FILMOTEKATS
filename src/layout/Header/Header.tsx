import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Navigation from "../../components/Navigation/Navigation";
import SearchForm from "../../components/SearchForm/SearchForm";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch";
import Button from "../../components/Button/Button";
import styles from "./Header.module.scss";
import { useStore } from "../../utils/store";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { view, setView } = useStore((state) => ({
    view: state.view as "queue" | "watched" | null, // Cast the view to a valid type
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
    const viewFromPath = location.pathname.split("/").pop();
    if (viewFromPath === "queue" || viewFromPath === "watched") {
      setView(viewFromPath as "queue" | "watched");
    } else {
      setView(null);
    }
  }, [location.pathname, setView]);

  const handleViewChange = (view: "queue" | "watched") => {
    setView(view);
    navigate(`/FILMOTEKATS/library/${view}`);
  };

  return (
    <header>
      <div className={styles.container}>
        <Logo />
        <Navigation />
        <div className={styles.controlsWrapper}>
          {location.pathname.startsWith("/FILMOTEKATS/library/") ? (
            <div className={styles.libraryControls}>
              <Button
                onClick={() => handleViewChange("queue")}
                label="Queue"
                variant={view === "queue" ? "primary" : "secondary"}
                className={styles.button}
              />
              <Button
                onClick={() => handleViewChange("watched")}
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
