import { Movie } from "../../ts/types/Movie";
import noPoster from "../../images/no-poster.jpg";
import styles from "./Gallery.module.scss";

interface GalleryProps {
  movies: Movie[];
}

const Gallery: React.FC<GalleryProps> = ({ movies }) => {
  return (
    <div className={styles.gallery}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className={styles.movieItem}>
            <img
              src={
                movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noPoster
              }
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))
      ) : (
        <p>No movies available</p>
      )}
    </div>
  );
};

export default Gallery;
