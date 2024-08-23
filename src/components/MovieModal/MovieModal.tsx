import { Movie } from "../../ts/types/Movie";
import styles from "./MovieModal.module.scss";
import Button from "../Button/Button";
import React, { useEffect } from "react";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
  onAddToQueue: (movie: Movie) => void;
  onAddToWatched: (movie: Movie) => void;
}

const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  onClose,
  onAddToQueue,
  onAddToWatched,
}) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div className={styles.movieDetails}>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.moviePoster}
            />
          ) : (
            <img
              src="/images/no-poster.jpg"
              alt="No Poster Available"
              className={styles.moviePoster}
            />
          )}
          <div className={styles.movieInfo}>
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <p className={styles.movieOverview}>{movie.overview}</p>
            <p className={styles.movieReleaseDate}>Release Date: {movie.release_date}</p>
            <p className={styles.movieVoteAverage}>Rating: {movie.vote_average.toFixed(1)}</p>
            <p className={styles.movieVoteCount}>Votes: {movie.vote_count}</p>
            <div className={styles.buttonContainer}>
              <Button onClick={() => onAddToQueue(movie)} label="Add to Queue" variant="primary" />
              <Button
                onClick={() => onAddToWatched(movie)}
                label="Add to Watched"
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
