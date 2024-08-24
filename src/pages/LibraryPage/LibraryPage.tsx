import { useEffect, useState } from "react";
import { getQueue } from "../../utils/storageUtils";
import { Movie } from "../../ts/types/Movie";
import Gallery from "../../components/Gallery/Gallery";
import styles from "./LibraryPage.module.scss"; // Importuj moduł SCSS

const LibraryPage: React.FC = () => {
  const [queueMovies, setQueueMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const storedQueue = getQueue();
    setQueueMovies(storedQueue);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.pageHeader}> {/* Użyj klasy z modułu SCSS */}
        Movie Queue
      </h2>
      <div className={styles.galleryContainer}> {/* Opcjonalnie, jeśli chcesz otoczyć Gallery */}
        <Gallery movies={queueMovies} />
      </div>
    </div>
  );
};

export default LibraryPage;
