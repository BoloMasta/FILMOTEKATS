import SVG from "react-inlinesvg";
import { Movie } from "../../ts/types/Movie";
import { useEffect, useState } from "react";
import styles from "./MovieModal.module.scss";
import Button from "../Button/Button";
import noPoster from "../../images/no-poster.jpg";
import { FetchApiMovies } from "../../ts/api/fetchMovies"; // Import klasy FetchApiMovies

interface Genre {
  id: number;
  name: string;
}

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
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const api = new FetchApiMovies();
      const genresListResponse = await api.getGenresIdsList();

      if (genresListResponse && genresListResponse.genres) {
        const movieGenres = movie.genre_ids.map((genreId) => {
          const genre = genresListResponse.genres.find((g: Genre) => g.id === genreId);
          return genre ? genre.name : "Unknown";
        });
        setGenres(movieGenres);
      }
    };

    fetchGenres();
  }, [movie.genre_ids]);

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

        <img
            src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : noPoster
                }
                alt={movie.title}
                className={styles.moviePoster}
              />

          <div className={styles.movieInfo}>
            <h2 className={styles.movieTitle}>
              {movie.title}
              {movie.adult && (
                <SVG src="/images/icons/18-icon.svg" className={styles.adultIcon} />
              )}
            </h2>
            {genres.length > 0 && (
              <p className={styles.movieGenres}>
                Genres: {genres.join(", ")}
              </p>
            )}
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
