import { useEffect } from "react";
import { useStore } from "../../utils/store";
import Gallery from "../../components/Gallery/Gallery";
import styles from "./LibraryPage.module.scss";

const LibraryPage: React.FC = () => {
  const { view, movies, loadMovies } = useStore(state => ({
    view: state.view,
    movies: state.movies,
    loadMovies: state.loadMovies
  }));

  useEffect(() => {
    loadMovies();
  }, [view, loadMovies]);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageHeader}>
        {view === 'queue' ? 'Movie Queue' : 'Watched Movies'}
      </h2>
      <div className={styles.galleryContainer}>
        <Gallery movies={movies} />
      </div>
    </div>
  );
};

export default LibraryPage;
