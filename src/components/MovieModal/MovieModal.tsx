import { useEffect, useState, useCallback } from 'react';
import { FetchApiMovies } from '../../ts/api/fetchMovies';
import { Img } from 'react-image';
import SVG from 'react-inlinesvg';
import Button from '../Button/Button';
import MovieActionButtons from '../MovieActionButtons/MovieActionButtons';
import Loader from '../../layout/Loader/Loader';
import Gallery from '../Gallery/Gallery';
import Pagination from '../Pagination/Pagination';
import { MinimalMovie, MovieDetails } from '../../ts/types/movieTypes';
import { MovieModalProps } from '../../ts/types/componentProps';
import { useStore } from '../../utils/store';
import noPoster from '../../images/no-poster.jpg';
import styles from './MovieModal.module.scss';

const MovieModal: React.FC<MovieModalProps> = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
  const [similarMovies, setSimilarMovies] = useState<MinimalMovie[]>([]);
  const [visibleSimilarMovies, setVisibleSimilarMovies] = useState<MinimalMovie[]>([]);
  const [similarCurrentPage, setSimilarCurrentPage] = useState<number>(1);
  const [similarTotalPages, setSimilarTotalPages] = useState<number>(0);
  const [isSimilarVisible, setIsSimilarVisible] = useState<boolean>(false);
  const [isSimilarLoading, setIsSimilarLoading] = useState<boolean>(true);

  const { toggleQueueStatus, toggleWatchedStatus, isMovieInList } = useStore((state) => ({
    toggleQueueStatus: state.toggleQueueStatus,
    toggleWatchedStatus: state.toggleWatchedStatus,
    isMovieInList: state.isMovieInList,
  }));

  const [inQueue, setInQueue] = useState<boolean>(false);
  const [inWatched, setInWatched] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsSimilarLoading(true);
      const api = new FetchApiMovies();
      try {
        const details = await api.getMovieDetails(movieId);
        if (details) {
          setMovieDetails(details);
          setInQueue(isMovieInList(details, 'queue'));
          setInWatched(isMovieInList(details, 'watched'));
        }
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      } finally {
        setIsSimilarLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId, isMovieInList]);

  // if (isSimilarVisible) {
  //   const fetchSimilarMovies = async () => {
  //     const api = new FetchApiMovies();
  //     try {
  //       const similarMovies = await api.getSimilar(movieId);

  //       console.log('Similar movies found in list of movies:', similarMovies.results);
  //     } catch (error) {
  //       console.error('Failed to fetch similar movies:', error);
  //     }
  //   };

  //   fetchSimilarMovies();
  // }

  const fetchSimilarMovies = useCallback(
    async (movieId: number) => {
      const api = new FetchApiMovies();

      try {
        const data = await api.getSimilar(movieId);

        if (data && data.results) {
          // Ogranicz liczbę wyników do 20
          const limitedResults = data.results.slice(0, 20);
          const totalMovies = limitedResults.length;

          // Ustal liczbę stron: 1 strona na każde 4 filmy
          const maxPages = Math.ceil(totalMovies / 4);

          // Ustaw filmy i liczbę stron w stanie
          setSimilarMovies(limitedResults);
          setSimilarTotalPages(maxPages);

          console.log(`Fetched ${totalMovies} similar movies.`);
        }
      } catch (error) {
        console.error('Failed to fetch similar movies:', error);
      }
    },
    [movieId]
  );

  // Aktualizuj widoczne filmy po zmianie currentPage lub similarMovies
  useEffect(() => {
    const startIndex = (similarCurrentPage - 1) * 4;
    const endIndex = similarCurrentPage * 4;
    setVisibleSimilarMovies(similarMovies.slice(startIndex, endIndex));
  }, [similarCurrentPage, similarMovies, isSimilarVisible]);

  // Wywołanie fetchSimilarMovies np. w useEffect
  useEffect(() => {
    if (isSimilarVisible) {
      fetchSimilarMovies(movieId);
    }
  }, [isSimilarVisible]);

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

  const onAddToQueue = useCallback(() => {
    if (movieDetails) {
      toggleQueueStatus(movieDetails, true);
      setInQueue(true);
    }
  }, [movieDetails, toggleQueueStatus]);

  const onRemoveFromQueue = useCallback(() => {
    if (movieDetails) {
      toggleQueueStatus(movieDetails, false);
      setInQueue(false);
    }
  }, [movieDetails, toggleQueueStatus]);

  const onAddToWatched = useCallback(() => {
    if (movieDetails) {
      toggleWatchedStatus(movieDetails, true);
      setInWatched(true);
    }
  }, [movieDetails, toggleWatchedStatus]);

  const onRemoveFromWatched = useCallback(() => {
    if (movieDetails) {
      toggleWatchedStatus(movieDetails, false);
      setInWatched(false);
    }
  }, [movieDetails, toggleWatchedStatus]);

  const moveToWatched = useCallback(() => {
    if (movieDetails) {
      toggleQueueStatus(movieDetails, false);
      toggleWatchedStatus(movieDetails, true);
      setInQueue(false);
      setInWatched(true);
    }
  }, [movieDetails, toggleQueueStatus, toggleWatchedStatus]);

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  const handlePageChange = (page: number) => {
    setSimilarCurrentPage(page);
  };

  if (!movieDetails) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <div className={styles.movieDetails}>
          {/* <img
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : noPoster
            }
            alt={movieDetails.title}
            className={styles.moviePoster}
          /> */}

          <Img
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                : noPoster
            }
            alt={movieDetails.title}
            className={styles.moviePoster}
            loader={
              <div className={styles.loaderWrapper}>
                <Loader />
              </div>
            }
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
                Genres: {movieDetails.genres.map((genre) => genre.name).join(', ')}
              </p>
            )}
            <p className={styles.movieOverview}>{movieDetails.overview}</p>
            {movieDetails.vote_average > 0 && (
              <p className={styles.movieVoteAverage}>
                Rating: {movieDetails.vote_average.toFixed(1)}
              </p>
            )}

            <div className={styles.buttonsContainer}>
              <Button
                onClick={() => setIsDetailsVisible(!isDetailsVisible)}
                label={isDetailsVisible ? 'Show Less' : 'More Info'}
                variant="tertiary"
                className={styles.moreInfoButton}
              />

              <Button
                onClick={() => setIsSimilarVisible(!isSimilarVisible)}
                label={isSimilarVisible ? 'Hide similar' : 'Show similar'}
                variant="tertiary"
                className={styles.moreInfoButton}
              />
            </div>

            <div
              className={`${styles.additionalDetails} ${
                isDetailsVisible ? styles.detailsVisible : ''
              }`}
              // ref={detailsRef}
            >
              {movieDetails.vote_count > 0 && (
                <p className={styles.detailItem}>Votes: {movieDetails.vote_count}</p>
              )}
              {movieDetails.release_date !== '' && (
                <p className={styles.detailItem}>Release Date: {movieDetails.release_date}</p>
              )}
              {movieDetails.spoken_languages.length > 0 && (
                <p className={styles.detailItem}>
                  Spoken Languages:{' '}
                  {movieDetails.spoken_languages.map((lang) => lang.english_name).join(', ')}
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
                  Production Countries:{' '}
                  {movieDetails.production_countries.map((country) => country.name).join(', ')}
                </p>
              )}
              {movieDetails.production_companies.length > 0 && (
                <p className={styles.detailItem}>
                  Production Companies:{' '}
                  {movieDetails.production_companies.map((company) => company.name).join(', ')}
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
              {movieDetails.homepage !== '' && (
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

            <div
              className={`${styles.similarMovies} ${isSimilarVisible ? styles.similarVisible : ''}`}
            >
              {isSimilarLoading ? (
                <div className={styles.loaderWrapper}>
                  <Loader /> {/* Loader widoczny podczas ładowania */}
                </div>
              ) : (
                <>
                  <Gallery movies={visibleSimilarMovies} variant="small" />
                  <Pagination
                    currentPage={similarCurrentPage}
                    totalPages={similarTotalPages}
                    onPageChange={handlePageChange}
                  />
                </>
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
