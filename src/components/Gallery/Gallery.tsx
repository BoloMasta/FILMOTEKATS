import { useState } from 'react';
import { Img } from 'react-image';
import { GalleryProps } from '../../ts/types/componentProps';
import noPoster from '../../images/no-poster.jpg';
import Loader from '../../layout/Loader/Loader';
import styles from './Gallery.module.scss';
import MovieModal from '../MovieModal/MovieModal';

const Gallery: React.FC<GalleryProps> = ({ movies, variant = 'standard' }) => {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  const galleryClass = variant === 'small' ? styles.gallerySmall : styles.gallery;
  const movieItemClass = variant === 'small' ? styles.movieItemSmall : styles.movieItem;

  return (
    <>
      <div className={galleryClass}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className={movieItemClass}
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className={styles.imageWrapper}>
                <Img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : noPoster
                  }
                  alt={movie.title}
                  className={styles.movieImage}
                  loader={
                    <div className={styles.loaderWrapper}>
                      <Loader />
                    </div>
                  }
                />
              </div>
              <h3>{movie.title}</h3>
            </div>
          ))
        ) : (
          <p>No movies available</p>
        )}
      </div>

      {selectedMovieId && <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />}
    </>
  );
};

export default Gallery;
