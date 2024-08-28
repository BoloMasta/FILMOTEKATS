import { useState } from "react";
import { GalleryProps } from "../../ts/types/componentProps";
import noPoster from "../../images/no-poster.jpg";
import styles from "./Gallery.module.scss";
import MovieModal from "../MovieModal/MovieModal";

const Gallery: React.FC<GalleryProps> = ({ movies }) => {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  return (
    <div>
      <div className={styles.gallery}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className={styles.movieItem}
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : noPoster
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

      {selectedMovieId && <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />}
    </div>
  );
};

export default Gallery;
