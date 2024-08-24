import { Movie } from './../ts/types/Movie';

const QUEUE_KEY = 'movieQueue';
const WATCHED_KEY = 'watchedMovies';

export const addToQueue = (movie: Movie) => {
  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  if (!queue.some((item: Movie) => item.id === movie.id)) {
    queue.push({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path
    });
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  }
};

export const removeFromQueue = (movie: Movie) => {
  let queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  queue = queue.filter((item: Movie) => item.id !== movie.id);
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
};

export const addToWatched = (movie: Movie) => {
  const watched = JSON.parse(localStorage.getItem(WATCHED_KEY) || '[]');
  if (!watched.some((item: Movie) => item.id === movie.id)) {
    watched.push({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path
    });
    localStorage.setItem(WATCHED_KEY, JSON.stringify(watched));
  }
};

export const removeFromWatched = (movie: Movie) => {
  let watched = JSON.parse(localStorage.getItem(WATCHED_KEY) || '[]');
  watched = watched.filter((item: Movie) => item.id !== movie.id);
  localStorage.setItem(WATCHED_KEY, JSON.stringify(watched));
};

export const getQueue = (): Movie[] => {
  return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
};

export const getWatched = (): Movie[] => {
  return JSON.parse(localStorage.getItem(WATCHED_KEY) || '[]');
};

export const isMovieInQueue = (movie: Movie): boolean => {
  const queue = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
  return queue.some((item: Movie) => item.id === movie.id);
};

export const isMovieInWatched = (movie: Movie): boolean => {
  const watched = JSON.parse(localStorage.getItem(WATCHED_KEY) || '[]');
  return watched.some((item: Movie) => item.id === movie.id);
};
