// import Icon from "./../Icon/Icon";
import SVG from "react-inlinesvg";
import styles from "./SearchForm.module.scss";

const SearchForm: React.FC = () => (
  <div className={styles.searchForm}>
    <form className={styles.form} autoComplete="off" id="home">
      <label className={styles.formLabel}>
        <input
          type="text"
          name="searchQuery"
          placeholder="Movie search"
          className={styles.formInput}
        />
      </label>
      <button className={styles.formBtn} type="submit">
        <SVG src="/images/icons/search-icon.svg" className={styles.formBtnIcon} />
      </button>
      <div className={styles.searchError}></div>
    </form>
    <p className={styles.notification}>
      Search result not successful. Enter the correct movie name.
    </p>
  </div>
);

export default SearchForm;
