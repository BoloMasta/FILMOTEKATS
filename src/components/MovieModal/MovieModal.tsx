import React, { useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { Movie, MovieDetails } from '../../ts/types/Movie';
import styles from './MovieModal.module.scss';
import Button from '../Button/Button';
import { 
  addToQueue, 
  addToWatched, 
  removeFromQueue, 
  removeFromWatched, 
  isMovieInQueue, 
  isMovieInWatched 
} from './../../utils/storageUtils'; 
import noPoster from '../../images/no-poster.jpg';
import { FetchApiMovies } from '../../ts/api/fetchMovies';
import { useStore } from '../../utils/store';

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
        console.error('Failed to fetch movie details:', error);
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
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const onAddToQueue = (movie: Movie) => {
    addToQueue(movie);
    setInQueue(true);
  };

  const onRemoveFromQueue = (movie: Movie) => {
    removeFromQueue(movie);
    setInQueue(false);
  };

  const onAddToWatched = (movie: Movie) => {
    addToWatched(movie);
    setInWatched(true);
  };

  const onRemoveFromWatched = (movie: Movie) => {
    removeFromWatched(movie);
    setInWatched(false);
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
                <SVG src="/images/icons/18-icon.svg" className={styles.adultIcon} />
              )}
            </h2>
            {movieGenres.length > 0 && (
              <p className={styles.movieGenres}>
                Genres: {movieGenres.join(", ")}
              </p>
            )}
            <p className={styles.movieOverview}>{movieDetails.overview}</p>
            <p className={styles.movieReleaseDate}>Release Date: {movieDetails.release_date}</p>
            <p className={styles.movieVoteAverage}>Rating: {movieDetails.vote_average.toFixed(1)}</p>
            <p className={styles.movieVoteCount}>Votes: {movieDetails.vote_count}</p>

            {movieDetails.spoken_languages.length > 0 && (
              <p className={styles.movieLanguages}>
                Spoken Languages: {movieDetails.spoken_languages.map(lang => lang.english_name).join(', ')}
              </p>
            )}

            <div className={styles.buttonContainer}>
              {inQueue ? (
                <Button onClick={() => onRemoveFromQueue(movie)} label="Remove from Queue" variant="primary" />
              ) : (
                <Button onClick={() => onAddToQueue(movie)} label="Add to Queue" variant="primary" />
              )}
              {inWatched ? (
                <Button onClick={() => onRemoveFromWatched(movie)} label="Remove from Watched" variant="secondary" />
              ) : (
                <Button onClick={() => onAddToWatched(movie)} label="Add to Watched" variant="secondary" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
