import { useEffect, useState, useCallback } from 'react';
import { FetchApiMovies } from '../../ts/api/fetchMovies';
import { Img } from 'react-image';
import SVG from 'react-inlinesvg';
import Button from '../Button/Button';
import MovieAdditionalDetails from '../MovieAdditionalDetails/MovieAdditionalDetails';
import MovieActionButtons from '../MovieActionButtons/MovieActionButtons';
import Loader from '../../layout/Loader/Loader';
import Gallery from '../Gallery/Gallery';
import Pagination from '../Pagination/Pagination';
import { MinimalMovie, MovieDetails } from '../../ts/types/movieTypes';
import { MovieModalProps } from '../../ts/types/componentProps';
import { Image } from '../../ts/types/commonTypes';
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
  const [images, setImages] = useState<Image[]>([]);
  const [isImagesVisible, setIsImagesVisible] = useState<boolean>(false);

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

  const fetchSimilarMovies = useCallback(async (movieId: number) => {
    const api = new FetchApiMovies();

    try {
      const data = await api.getSimilar(movieId);

      if (data && data.results) {
        const limitedResults = data.results.slice(0, 20);
        const totalMovies = limitedResults.length;
        const maxPages = Math.ceil(totalMovies / 4);

        setSimilarMovies(limitedResults);
        setSimilarTotalPages(maxPages);

        console.log(`Fetched ${totalMovies} similar movies.`);
      }
    } catch (error) {
      console.error('Failed to fetch similar movies:', error);
    }
  }, []);

  useEffect(() => {
    const startIndex = (similarCurrentPage - 1) * 4;
    const endIndex = similarCurrentPage * 4;
    setVisibleSimilarMovies(similarMovies.slice(startIndex, endIndex));
  }, [similarCurrentPage, similarMovies, isSimilarVisible]);

  useEffect(() => {
    if (isSimilarVisible) {
      fetchSimilarMovies(movieId);
    }
  }, [isSimilarVisible, fetchSimilarMovies, movieId]);

  const fetchImages = useCallback(
    async (movieId: number) => {
      const api = new FetchApiMovies();

      try {
        const data = await api.getImages(movieId);
        console.log(data);
        if (data && data.backdrops && data.backdrops.length > 0) {
          setImages(data.backdrops);
        }
      } catch (error) {
        console.error('Failed to fetch movie images:', error);
      } finally {
        console.log('Images fetched', images);
      }
    },
    [images]
  );

  useEffect(() => {
    if (isImagesVisible) {
      fetchImages(movieId);
    }
  }, [isImagesVisible]);

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

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible((prev) => {
      if (prev) {
        setIsSimilarVisible(false);
        return false;
      } else {
        setIsSimilarVisible(false);
        return true;
      }
    });
  };

  const toggleSimilarVisibility = () => {
    setIsSimilarVisible((prev) => {
      if (prev) {
        setIsDetailsVisible(false);
        return false;
      } else {
        setIsDetailsVisible(false);
        return true;
      }
    });
  };

  const toogleImagesVisibility = () => {
    setIsImagesVisible((prev) => !prev);
  };

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
          <div className={styles.imageWrapper}>
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
          </div>

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
                onClick={toggleDetailsVisibility}
                label={isDetailsVisible ? 'Show Less' : 'More Info'}
                variant={isDetailsVisible ? 'secondary' : 'tertiary'}
                className={styles.moreInfoButton}
              />
              <Button
                onClick={toggleSimilarVisibility}
                label={isSimilarVisible ? 'Hide similar' : 'Show similar'}
                variant={isSimilarVisible ? 'secondary' : 'tertiary'}
                className={styles.moreInfoButton}
              />
              <Button
                onClick={toogleImagesVisibility}
                label={isImagesVisible ? 'Hide images' : 'Show images'}
                variant={isImagesVisible ? 'secondary' : 'tertiary'}
                className={styles.moreInfoButton}
              />
            </div>

            <div
              className={`${styles.additionalDetails} ${
                isDetailsVisible ? styles.detailsVisible : ''
              }`}
            >
              <MovieAdditionalDetails movieDetails={movieDetails} />
            </div>

            <div
              className={`${styles.similarMovies} ${isSimilarVisible ? styles.similarVisible : ''}`}
            >
              {isSimilarLoading ? (
                <div className={styles.loaderWrapper}>
                  <Loader />
                </div>
              ) : (
                <>
                  <h4 className={styles.similarTitle}>Similar movies:</h4>

                  <Gallery movies={visibleSimilarMovies} variant="small" />

                  {similarTotalPages > 1 && (
                    <Pagination
                      currentPage={similarCurrentPage}
                      totalPages={similarTotalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
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
              movie={movieDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
