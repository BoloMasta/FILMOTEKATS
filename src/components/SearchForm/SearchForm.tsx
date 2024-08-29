import { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import { useSearchParams } from "react-router-dom";
import styles from "./SearchForm.module.scss";

const SearchForm: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlQuery = searchParams.get("query") || "";
    setQuery(urlQuery);
  }, [searchParams]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!query) {
      return;
    }

    setSearchParams({ query });
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
