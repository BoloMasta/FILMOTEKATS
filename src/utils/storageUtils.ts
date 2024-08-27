import { MinimalMovie } from "./../ts/types/Movie";

const QUEUE_KEY = "movieQueue";
const WATCHED_KEY = "watchedMovies";

const getFromStorage = (key: string): MinimalMovie[] => {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

const saveToStorage = (key: string, data: MinimalMovie[]) => {
  localStorage.setItem(key, JSON.stringify(data));
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
  getQueue().some((item) => item.id === movie.id);
export const isMovieInWatched = (movie: MinimalMovie): boolean =>
  getWatched().some((item) => item.id === movie.id);
