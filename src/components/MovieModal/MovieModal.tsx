import { useEffect, useState, useRef, useCallback } from "react";
import { FetchApiMovies } from "../../ts/api/fetchMovies";
import SVG from "react-inlinesvg";
import Button from "../Button/Button";
import MovieActionButtons from "../MovieActionButtons/MovieActionButtons";
import { MovieDetails } from "../../ts/types/movieTypes";
import { MovieModalProps } from "../../ts/types/componentProps";
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

const MovieModal: React.FC<MovieModalProps> = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [inQueue, setInQueue] = useState<boolean>(false);
  const [inWatched, setInWatched] = useState<boolean>(false);
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);

  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const api = new FetchApiMovies();
      try {
        const details = await api.getMovieDetails(movieId);
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
  }, [movieId]);

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
    if (movieDetails) {
      addToQueue(movieDetails);
      setInQueue(true);
    }
  }, [movieDetails]);

  const onRemoveFromQueue = useCallback(() => {
    if (movieDetails) {
      removeFromQueue(movieDetails);
      setInQueue(false);
    }
  }, [movieDetails]);

  const onAddToWatched = useCallback(() => {
    if (movieDetails) {
      addToWatched(movieDetails);
      setInWatched(true);
    }
  }, [movieDetails]);

  const onRemoveFromWatched = useCallback(() => {
    if (movieDetails) {
      removeFromWatched(movieDetails);
      setInWatched(false);
    }
  }, [movieDetails]);

  const moveToWatched = useCallback(() => {
    if (movieDetails) {
      removeFromQueue(movieDetails);
      addToWatched(movieDetails);
      setInQueue(false);
      setInWatched(true);
    }
  }, [movieDetails]);

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

            {movieDetails.genres.length > 0 && (
              <p className={styles.movieGenres}>
                Genres: {movieDetails.genres.map((genre) => genre.name).join(", ")}
              </p>
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
              {movieDetails.production_countries.length > 0 && (
                <p className={styles.detailItem}>
                  Production Countries:{" "}
                  {movieDetails.production_countries.map((country) => country.name).join(", ")}
                </p>
              )}
              {movieDetails.production_companies.length > 0 && (
                <p className={styles.detailItem}>
                  Production Companies:{" "}
                  {movieDetails.production_companies.map((company) => company.name).join(", ")}
                </p>
              )}
              {movieDetails.imdb_id !== null && (
                <a
                  href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.imdbLink}
                >
                  View on IMDb
                </a>
              )}
              <br />
              {movieDetails.homepage !== "" && (
                <a
                  href={movieDetails.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.homepageLink}
                >
                  Visit Website
                </a>
              )}
            </div>

            <MovieActionButtons
              inQueue={inQueue}
              inWatched={inWatched}
              onAddToQueue={onAddToQueue}
              onRemoveFromQueue={onRemoveFromQueue}
              onAddToWatched={onAddToWatched}
              onRemoveFromWatched={onRemoveFromWatched}
              moveToWatched={moveToWatched}
              movie={movieDetails} // Przekazuje szczegóły filmu zamiast obiektu Movie
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
