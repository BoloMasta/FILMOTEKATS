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
  const [visibleimages, setVisibleImages] = useState<Image[]>([]);
  const [isImagesVisible, setIsImagesVisible] = useState<boolean>(false);
  const [imagesCurrentPage, setImagesCurrentPage] = useState<number>(1);
  const [imagesTotalPages, setImagesTotalPages] = useState<number>(0);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    const startIndex = (imagesCurrentPage - 1) * 6;
    const endIndex = imagesCurrentPage * 6;
    setVisibleImages(images.slice(startIndex, endIndex));
  }, [imagesCurrentPage, images, isImagesVisible]);

  useEffect(() => {
    if (isSimilarVisible) {
      fetchSimilarMovies(movieId);
    }
  }, [isSimilarVisible, fetchSimilarMovies, movieId]);

  const fetchImages = useCallback(async (movieId: number) => {
    const api = new FetchApiMovies();

    try {
      const data = await api.getImages(movieId);

      if (data && data.backdrops) {
        const backdrops = data.backdrops;
        const limitedResults = backdrops.slice(0, 6);
        const totalImages = backdrops.length;
        const maxPages = Math.ceil(totalImages / 6);

        setImages(limitedResults);
        setImagesTotalPages(maxPages);

        return backdrops;
      } else {
        setImages([]);
        setImagesTotalPages(0);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch movie images:', error);
      setImages([]);
      setImagesTotalPages(0);
      return [];
    }
  }, []);

  useEffect(() => {
    if (isImagesVisible) {
      fetchImages(movieId).then((fetchedImages) => {
        if (fetchedImages.length > 0) {
          setImages(fetchedImages);
        }
      });
    }
  }, [isImagesVisible, fetchImages, movieId]);

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
        return false;
      } else {
        setIsSimilarVisible(false);
        setIsImagesVisible(false);
        return true;
      }
    });
  };

  const toggleSimilarVisibility = () => {
    setIsSimilarVisible((prev) => {
      if (prev) {
        return false;
      } else {
        setIsDetailsVisible(false);
        setIsImagesVisible(false);
        return true;
      }
    });
  };

  const toggleImagesVisibility = () => {
    setIsImagesVisible((prev) => {
      if (prev) {
        return false;
      } else {
        setIsDetailsVisible(false);
        setIsSimilarVisible(false);
        return true;
      }
    });
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

  const handleSimilarPageChange = (page: number) => {
    setSimilarCurrentPage(page);
  };

  const handleImagesPageChange = (page: number) => {
    setImagesCurrentPage(page);
  };

  const handleImageClick = (imagePath: string | null) => {
    setSelectedImage(imagePath);
    setIsOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayVisible(false);
    setSelectedImage(null);
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
              onClick={() => handleImageClick(movieDetails.poster_path)}
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
                onClick={toggleImagesVisibility}
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
                  <h4>Similar movies:</h4>

                  <Gallery movies={visibleSimilarMovies} variant="small" />

                  {similarTotalPages > 1 && (
                    <Pagination
                      currentPage={similarCurrentPage}
                      totalPages={similarTotalPages}
                      onPageChange={handleSimilarPageChange}
                    />
                  )}
                </>
              )}
            </div>

            <div className={`${styles.images} ${isImagesVisible ? styles.imagesVisible : ''}`}>
              <h4 className={styles.imagesTitle}>Images:</h4>
              {visibleimages.length > 0 ? (
                <>
                  {visibleimages.map((image) => (
                    <Img
                      key={image.file_path}
                      src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                      alt="Movie image"
                      className={styles.image}
                      onClick={() => handleImageClick(image.file_path)}
                      loader={
                        <div className={styles.loaderWrapper}>
                          <Loader />
                        </div>
                      }
                    />
                  ))}
                </>
              ) : (
                <p style={{ margin: '3px' }}>No images available.</p>
              )}
            </div>

            {isOverlayVisible && selectedImage && (
              <div className={styles.overlay} onClick={handleCloseOverlay}>
                <img
                  src={`https://image.tmdb.org/t/p/original${selectedImage}`}
                  alt="Expanded movie image"
                  className={styles.overlayImage}
                />
              </div>
            )}

            {isImagesVisible && imagesTotalPages > 1 && (
              <Pagination
                currentPage={imagesCurrentPage}
                totalPages={imagesTotalPages}
                onPageChange={handleImagesPageChange}
              />
            )}

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
