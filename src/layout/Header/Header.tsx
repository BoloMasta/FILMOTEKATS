import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import Navigation from '../../components/Navigation/Navigation';
import SearchForm from '../../components/SearchForm/SearchForm';
import Switch from '../../components/Switch/Switch';
import Button from '../../components/Button/Button';
import styles from './Header.module.scss';
import { useStore } from '../../utils/store';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { view, setView, adults, setAdults } = useStore((state) => ({
    view: state.view as 'queue' | 'watched' | null,
    setView: state.setView,
    adults: state.adults,
    setAdults: state.setAdults,
  }));

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedAdults = localStorage.getItem('adults');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      setIsDarkTheme(savedTheme === 'dark');
    }
    if (savedAdults) {
      setAdults(savedAdults === 'true');
    }
  }, [setAdults]);

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleAdults = () => {
    const newAdultsValue = !adults;
    setAdults(newAdultsValue);
    localStorage.setItem('adults', String(newAdultsValue));
  };

  useEffect(() => {
    const viewFromPath = location.pathname.split('/').pop();
    if (viewFromPath === 'queue' || viewFromPath === 'watched') {
      setView(viewFromPath as 'queue' | 'watched');
    } else {
      setView(null);
    }
  }, [location.pathname, setView]);

  const handleViewChange = (view: 'queue' | 'watched') => {
    setView(view);
    navigate(`/FILMOTEKATS/library/${view}`);
  };

  return (
    <header>
      <div className={styles.container}>
        <Logo />
        <Navigation />
        <div className={styles.controlsWrapper}>
          {location.pathname.startsWith('/FILMOTEKATS/library/') ? (
            <div className={styles.libraryControls}>
              <Button
                onClick={() => handleViewChange('queue')}
                label="Queue"
                variant={view === 'queue' ? 'primary' : 'secondary'}
                className={styles.button}
              />
              <Button
                onClick={() => handleViewChange('watched')}
                label="Watched"
                variant={view === 'watched' ? 'primary' : 'secondary'}
                className={styles.button}
              />
            </div>
          ) : (
            <SearchForm />
          )}
        </div>
        <div className={styles.switchesContainer}>
          <Switch
            label="Change theme:"
            isChecked={isDarkTheme}
            onToggle={toggleTheme}
            dataAttribute={isDarkTheme ? 'dark' : 'light'}
          />
          <Switch label="Movies 18+" isChecked={adults} onToggle={toggleAdults} />
        </div>
      </div>
    </header>
  );
};

export default Header;
