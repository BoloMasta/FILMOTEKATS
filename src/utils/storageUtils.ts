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

export const getQueue = (): Movie[] => {
  return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
};

export const getWatched = (): Movie[] => {
  return JSON.parse(localStorage.getItem(WATCHED_KEY) || '[]');
};
