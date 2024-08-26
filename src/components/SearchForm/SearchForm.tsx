import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import styles from "./SearchForm.module.scss";
import { useSearchParams } from "react-router-dom";

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlQuery = searchParams.get("query");
    if (!urlQuery) {
      setQuery("");
    }
  }, [searchParams]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query) {
      setSearchError("Please enter a search term.");
      return;
    }

    setLoading(true);
    setSearchError("");

    try {
      setSearchParams({ query });
    } catch (error) {
      console.error("An error occurred:", error);
      setSearchError("An error occurred while setting the search query.");
    } finally {
      setLoading(false);
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
            disabled={loading}
          />
        </label>
        <button className={styles.formBtn} type="submit" disabled={loading}>
          <SVG src="/images/icons/search-icon.svg" className={styles.formBtnIcon} />
        </button>
        {searchError && <div className={styles.searchError}>{searchError}</div>}
      </form>
      {loading && <div className={styles.loading}>Loading...</div>}
    </div>
  );
};

export default SearchForm;
