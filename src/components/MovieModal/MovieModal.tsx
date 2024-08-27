import { useEffect, useState, useRef, useCallback } from "react";
import { useStore } from "../../utils/store";
import { FetchApiMovies } from "../../ts/api/fetchMovies";
import SVG from "react-inlinesvg";
import { Movie, MovieDetails } from "../../ts/types/Movie";
import Button from "../Button/Button";
import MovieActionButtons from "../MovieActionButtons/MovieActionButtons";
import {
  addToQueue,
  addToWatched,
  removeFromQueue,
  removeFromWatched,
  isMovieInQueue,
  isMovieInWatched,
} from "./../../utils/storageUtils";
import noPoster from "../../images/no-poster.jpg";
import styles from "./MovieModal.module.scss";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  const { genres, fetchGenres } = useStore();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [movieGenres, setMovieGenres] = useState<string[]>([]);
  const [inQueue, setInQueue] = useState<boolean>(false);
  const [inWatched, setInWatched] = useState<boolean>(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);

  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const api = new FetchApiMovies();
      try {
        const details = await api.getMovieDetails(movie.id);
        if (details) {
          setMovieDetails(details);
          setInQueue(isMovieInQueue(details));
          setInWatched(isMovieInWatched(details));
        } else {
          setMovieDetails(null);
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setMovieDetails(null);
      }
    };

    fetchMovieDetails();
  }, [movie.id]);

  useEffect(() => {
    if (genres.length === 0) {
      fetchGenres();
    }
  }, [fetchGenres, genres.length]);

  useEffect(() => {
    if (movieDetails) {
      const genreNames = movieDetails.genres.map((genre) => genre.name);
      setMovieGenres(genreNames);
    }
  }, [movieDetails, genres]);

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

  const onAddToQueue = useCallback(() => {
    addToQueue(movie);
    setInQueue(true);
  }, [movie]);

  const onRemoveFromQueue = useCallback(() => {
    removeFromQueue(movie);
    setInQueue(false);
  }, [movie]);

  const onAddToWatched = useCallback(() => {
    addToWatched(movie);
    setInWatched(true);
  }, [movie]);

  const onRemoveFromWatched = useCallback(() => {
    removeFromWatched(movie);
    setInWatched(false);
  }, [movie]);

  const moveToWatched = useCallback(() => {
    removeFromQueue(movie);
    addToWatched(movie);
    setInQueue(false);
    setInWatched(true);
  }, [movie]);

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  if (!movieDetails) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div className={styles.movieDetails}>
          <img
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : noPoster
            }
            alt={movieDetails.title}
            className={styles.moviePoster}
          />

          <div className={styles.movieInfo}>
            <h2 className={styles.movieTitle}>
              {movieDetails.title}
              {movieDetails.adult && (
                <SVG
                  src={`${import.meta.env.BASE_URL}images/icons/18-icon.svg`}
                  className={styles.adultIcon}
                />
              )}
            </h2>
            {movieGenres.length > 0 && (
              <p className={styles.movieGenres}>Genres: {movieGenres.join(", ")}</p>
            )}
            <p className={styles.movieOverview}>{movieDetails.overview}</p>
            {movieDetails.vote_average > 0 && (
              <p className={styles.movieVoteAverage}>
                Rating: {movieDetails.vote_average.toFixed(1)}
              </p>
            )}

            <Button
              onClick={() => setIsDetailsVisible(!isDetailsVisible)}
              label={isDetailsVisible ? "Show Less" : "More Info"}
              variant="tertiary"
              className={styles.moreInfoButton}
            />

            <div
              className={`${styles.additionalDetails} ${
                isDetailsVisible ? styles.detailsVisible : ""
              }`}
              ref={detailsRef}
            >
              {movieDetails.vote_count > 0 && (
                <p className={styles.detailItem}>Votes: {movieDetails.vote_count}</p>
              )}
              {movieDetails.release_date !== "" && (
                <p className={styles.detailItem}>Release Date: {movieDetails.release_date}</p>
              )}
              {movieDetails.spoken_languages.length > 0 && (
                <p className={styles.detailItem}>
                  Spoken Languages:{" "}
                  {movieDetails.spoken_languages.map((lang) => lang.english_name).join(", ")}
                </p>
              )}
              {movieDetails.budget > 0 && (
                <p className={styles.detailItem}>Budget: ${movieDetails.budget.toLocaleString()}</p>
              )}
              {movieDetails.runtime !== null && movieDetails.runtime > 0 && (
                <p className={styles.detailItem}>Runtime: {formatRuntime(movieDetails.runtime)}</p>
              )}
              <a
                href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.imdbLink}
              >
                View on IMDb
              </a>
            </div>

            <MovieActionButtons
              inQueue={inQueue}
              inWatched={inWatched}
              onAddToQueue={onAddToQueue}
              onRemoveFromQueue={onRemoveFromQueue}
              onAddToWatched={onAddToWatched}
              onRemoveFromWatched={onRemoveFromWatched}
              moveToWatched={moveToWatched}
              movie={movie}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
