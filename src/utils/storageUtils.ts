import { MinimalMovie } from './../ts/types/movieTypes';

const QUEUE_KEY = 'movieQueue';
const WATCHED_KEY = 'watchedMovies';

const getFromStorage = (key: string): MinimalMovie[] => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error(`Error getting ${key} from storage`, error);
    return [];
  }
};

const saveToStorage = (key: string, data: MinimalMovie[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to storage`, error);
  }
};

const addMovie = (key: string, movie: MinimalMovie) => {
  const movies = getFromStorage(key);
  if (!movies.some((item) => item.id === movie.id)) {
    movies.push({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
    });
    saveToStorage(key, movies);
  }
};

const removeMovie = (key: string, movie: MinimalMovie) => {
  const movies = getFromStorage(key).filter((item) => item.id !== movie.id);
  saveToStorage(key, movies);
};

export const addToQueue = (movie: MinimalMovie) => addMovie(QUEUE_KEY, movie);
export const removeFromQueue = (movie: MinimalMovie) => removeMovie(QUEUE_KEY, movie);
export const addToWatched = (movie: MinimalMovie) => addMovie(WATCHED_KEY, movie);
export const removeFromWatched = (movie: MinimalMovie) => removeMovie(WATCHED_KEY, movie);

export const getQueue = (): MinimalMovie[] => getFromStorage(QUEUE_KEY);
export const getWatched = (): MinimalMovie[] => getFromStorage(WATCHED_KEY);

export const isMovieInQueue = (movie: MinimalMovie): boolean =>
  getFromStorage(QUEUE_KEY).some((item) => item.id === movie.id);

export const isMovieInWatched = (movie: MinimalMovie): boolean =>
  getFromStorage(WATCHED_KEY).some((item) => item.id === movie.id);
