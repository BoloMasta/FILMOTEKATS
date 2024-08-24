import React, { useEffect, useState } from 'react';
import Logo from '../../components/Logo/Logo';
import Navigation from '../../components/Navigation/Navigation';
import SearchForm from '../../components/SearchForm/SearchForm';
import ThemeSwitch from '../../components/ThemeSwitch/ThemeSwitch';
import Button from '../../components/Button/Button'; // Upewnij się, że masz komponent Button
import { Movie } from '../../ts/types/Movie';
import styles from './Header.module.scss';
import { getQueue, getWatched } from '../../utils/storageUtils'; // Upewnij się, że masz funkcje getQueue i getWatched

const Header: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [view, setView] = useState<'search' | 'queue' | 'watched'>('search');
  const [queueMovies, setQueueMovies] = useState<Movie[]>([]);
  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      setIsDarkTheme(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    if (view === 'queue') {
      setQueueMovies(getQueue());
    } else if (view === 'watched') {
      setWatchedMovies(getWatched());
    }
  }, [view]);

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleQueueClick = () => {
    setView('queue');
  };

  const handleWatchedClick = () => {
    setView('watched');
  };

  const isLibraryPage = window.location.pathname === '/library';

  return (
    <header className={styles.header} id="go-top">
      <div className={styles.container}>
        <Logo />
        <Navigation />
        {isLibraryPage ? (
          <div className={styles.buttonContainer}>
            <Button onClick={handleQueueClick} label="Queue" variant="primary" />
            <Button onClick={handleWatchedClick} label="Watched" variant="secondary" />
          </div>
        ) : (
          <>
            <SearchForm />
            <ThemeSwitch isDarkTheme={isDarkTheme} onToggleTheme={toggleTheme} />
          </>
        )}
      </div>
      {view === 'queue' && (
        <div className={styles.modalContent}>
          <h2>Queue Movies</h2>
          <ul>
            {queueMovies.length > 0 ? (
              queueMovies.map(movie => (
                <li key={movie.id}>
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'path/to/no-poster.jpg'}
                    alt={movie.title}
                  />
                  <span>{movie.title}</span>
                </li>
              ))
            ) : (
              <p>No movies in queue.</p>
            )}
          </ul>
        </div>
      )}
      {view === 'watched' && (
        <div className={styles.modalContent}>
          <h2>Watched Movies</h2>
          <ul>
            {watchedMovies.length > 0 ? (
              watchedMovies.map(movie => (
                <li key={movie.id}>
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'path/to/no-poster.jpg'}
                    alt={movie.title}
                  />
                  <span>{movie.title}</span>
                </li>
              ))
            ) : (
              <p>No watched movies.</p>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
