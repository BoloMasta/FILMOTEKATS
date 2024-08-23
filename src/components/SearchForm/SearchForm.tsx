import React, { useState } from "react";
import SVG from "react-inlinesvg";
import styles from "./SearchForm.module.scss";
import { FetchApiMovies } from "../../ts/api/fetchMovies";
import { Movie } from "../../ts/types/Movie";

interface SearchFormProps {
  onSearchResults: (movies: Movie[]) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query) {
      setSearchError("Please enter a search term.");
      return;
    }

    const api = new FetchApiMovies();
    const data = await api.getSearch(query, 1); // Fetching the first page
    if (data && data.results.length > 0) {
      onSearchResults(data.results);
      setSearchError("");
    } else {
      setSearchError("No results found. Please try again.");
      onSearchResults([]);
    }
  };

  return (
    <div className={styles.searchForm}>
      <form className={styles.form} autoComplete="off" id="home" onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          <input
            type="text"
            name="searchQuery"
            placeholder="Movie search"
            className={styles.formInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button className={styles.formBtn} type="submit">
          <SVG src="/images/icons/search-icon.svg" className={styles.formBtnIcon} />
        </button>
        {searchError && <div className={styles.searchError}>{searchError}</div>}
      </form>
    </div>
  );
};

export default SearchForm;
