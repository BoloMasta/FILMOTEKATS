import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header: React.FC = () => {
  // Inicjalizowanie stanu z localStorage
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  });

  // Funkcja do przełączania motywu
  const toggleTheme = () => {
    const newTheme = !isDarkTheme ? "dark" : "light";
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Ustawienie motywu przy załadowaniu komponentu
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setIsDarkTheme(savedTheme === "dark");
    }
  }, []);

  return (
    <header className="header" id="go-top">
      <div className="container nav__container">
        <div className="nav">
          <div className="nav__logo--container">
            <Link className="nav__logo" to="/">
              <svg className="nav__icon icon" width="24" height="24">
                <use href="./images/icons.svg#header-icon" />
              </svg>
              <span className="nav__title main-header">Filmoteka</span>
            </Link>
          </div>

          <nav className="navigation">
            <ul className="navigation__list">
              <li className="navigation__item">
                <Link className="navigation__link--active" to="/">
                  Home
                </Link>
              </li>
              <li className="navigation__item">
                <Link className="navigation__link" to="/library">
                  My Library
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header__search-form">
          <form className="form__container form" autoComplete="off" id="home">
            <label className="form__label">
              <input
                type="text"
                name="searchQuery"
                placeholder="Movie search"
                className="form__input"
              />
            </label>
            <button className="form__btn btn js-form-btn" type="submit">
              <svg className="form__btn-icon icon" width="12" height="12">
                <use href="./images/icons.svg#search-icon" />
              </svg>
            </button>
            <div className="search-error search-error--hidden"></div>
          </form>
          <p className="notification off">
            Search result not successful. Enter the correct movie name.
          </p>
        </div>

        <div className="theme-switch-wr">
          <ul className="theme">
            <li className="theme__item">Change theme:</li>
            <li className="theme__item">
              <label className="theme-switch">
                <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
                <div className="slider round"></div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
