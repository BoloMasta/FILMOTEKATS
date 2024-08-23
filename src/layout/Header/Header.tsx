import React, { useEffect, useState } from "react";
import Logo from "../../components/Logo/Logo";
import Navigation from "../../components/Navigation/Navigation";
import SearchForm from "../../components/SearchForm/SearchForm";
import ThemeSwitch from "../../components/ThemeSwitch/ThemeSwitch";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
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

  return (
    <header className={styles.header} id="go-top">
      <div className={styles.container}>
        <Logo />
        <Navigation />
        <SearchForm />
        <ThemeSwitch isDarkTheme={isDarkTheme} onToggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;
