import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { useStore } from '../../utils/store';

const Navigation: React.FC = () => {
  const setCategory = useStore((state) => state.setCategory);

  const handleHomeClick = () => {
    setCategory('popular');
  };

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigationList}>
        <li className={styles.navigationItem}>
          <NavLink
            to="/FILMOTEKATS/"
            style={{ textDecoration: 'none' }}
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
            end
            onClick={handleHomeClick}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.navigationItem}>
          <NavLink
            to="/FILMOTEKATS/library/queue"
            style={{ textDecoration: 'none' }}
            className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
          >
            My Library
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
