import { useState } from "react";
import { Movie } from "../../ts/types/Movie";
import noPoster from "../../images/no-poster.jpg";
import styles from "./Gallery.module.scss";
import MovieModal from "../MovieModal/MovieModal"; // Import MovieModal

interface GalleryProps {
  movies: Movie[];
}

const Gallery: React.FC<GalleryProps> = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <div className={styles.gallery}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div
              key={movie.id}
              className={styles.movieItem}
              onClick={() => handleMovieClick(movie)}
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

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
    </div>
  );
};

export default Gallery;
