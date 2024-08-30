import { useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchForm.module.scss';
import { useStore } from '../../utils/store';

const SearchForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { query, setQuery, setCategory } = useStore((state) => ({
    query: state.query,
    setQuery: state.setQuery,
    setCategory: state.setCategory,
  }));

  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    const urlQuery = searchParams.get('query') || '';
    setQuery(urlQuery);
    setLocalQuery(urlQuery); // Synchronizuj lokalny stan z aktualnym stanem globalnym
  }, [searchParams, setQuery]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!localQuery) {
      return;
    }

    setQuery(localQuery);
    setCategory('search'); // Ustawienie kategorii na "search"
    setSearchParams({ query: localQuery });
  };

  return (
    <div className={styles.searchForm}>
      <form
        className={styles.form}
        autoComplete="off"
        id="home"
        onSubmit={handleSubmit}
      >
        <label className={styles.formLabel}>
          <input
            type="text"
            name="searchQuery"
            placeholder="Movie search"
            className={styles.formInput}
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
          />
        </label>
        <button className={styles.formBtn} type="submit">
          <SVG
            src={`${import.meta.env.BASE_URL}images/icons/search-icon.svg`}
            className={styles.formBtnIcon}
          />
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
