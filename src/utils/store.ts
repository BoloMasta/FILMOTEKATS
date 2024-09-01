import { create } from 'zustand';
import { MinimalMovie } from './../ts/types/movieTypes';
import {
  getQueue,
  getWatched,
  addToQueue,
  removeFromQueue,
  addToWatched,
  removeFromWatched,
} from './../utils/storageUtils';

interface Store {
  adults: boolean;
  view: 'queue' | 'watched' | null;
  movies: MinimalMovie[];
  totalPages: number;
  currentPage: number;
  category: 'popular' | 'top_rated' | 'upcoming' | 'search';
  query: string;
  setAdults: (adults: boolean) => void;
  setCategory: (category: 'popular' | 'top_rated' | 'upcoming' | 'search') => void;
  setQuery: (query: string) => void;
  setView: (view: 'queue' | 'watched' | null) => void;
  setPage: (page: number) => void;
  loadMovies: () => void;
  // addToQueue: (movie: MinimalMovie) => void;
  // addToWatched: (movie: MinimalMovie) => void;
  // removeFromQueue: (movie: MinimalMovie) => void;
  // removeFromWatched: (movie: MinimalMovie) => void;
  toggleQueueStatus: (movie: MinimalMovie, add: boolean) => void;
  toggleWatchedStatus: (movie: MinimalMovie, add: boolean) => void;
  // isMovieInQueue: (movie: MinimalMovie) => boolean;
  // isMovieInWatched: (movie: MinimalMovie) => boolean;
  isMovieInList: (movie: MinimalMovie, listType: 'queue' | 'watched') => boolean;
}

export const useStore = create<Store>((set, get) => ({
  adults: false,
  view: 'queue',
  movies: [],
  totalPages: 0,
  currentPage: 1,
  category: 'popular',
  query: '',

  setAdults: (adults: boolean) => {
    set({ adults });
  },

  setView: (view) => {
    set({ view, currentPage: 1 });
    get().loadMovies();
  },

  setPage: (page) => {
    set({ currentPage: page });
    get().loadMovies();
  },

  loadMovies: () => {
    const { view, currentPage } = get();
    const movies = view === 'queue' ? getQueue() : getWatched();
    const ITEMS_PER_PAGE = 20;

    set({
      movies: movies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
      totalPages: Math.ceil(movies.length / ITEMS_PER_PAGE),
    });
  },

  setCategory: (category) => {
    set({ category });
  },

  setQuery: (query) => {
    set({ query });
  },

  // addToQueue: (movie) => {
  //   addToQueue(movie);
  //   get().loadMovies(); // Refresh the movies list
  // },

  // addToWatched: (movie) => {
  //   addToWatched(movie);
  //   get().loadMovies(); // Refresh the movies list
  // },

  // removeFromQueue: (movie) => {
  //   removeFromQueue(movie);
  //   get().loadMovies(); // Refresh the movies list
  // },

  // removeFromWatched: (movie) => {
  //   removeFromWatched(movie);
  //   get().loadMovies(); // Refresh the movies list
  // },

  toggleQueueStatus: (movie, add) => {
    add ? addToQueue(movie) : removeFromQueue(movie);
    get().loadMovies();
  },

  toggleWatchedStatus: (movie, add) => {
    add ? addToWatched(movie) : removeFromWatched(movie);
    get().loadMovies();
  },

  // isMovieInQueue: (movie) => {
  //   return getQueue().some((m) => m.id === movie.id);
  // },

  // isMovieInWatched: (movie) => {
  //   return getWatched().some((m) => m.id === movie.id);
  // },

  isMovieInList: (movie, listType) => {
    const list = listType === 'queue' ? getQueue() : getWatched();
    return list.some((m) => m.id === movie.id);
  },
}));
