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
  view: 'queue' | 'watched' | null;
  movies: MinimalMovie[];
  totalPages: number;
  currentPage: number;
  category: 'popular' | 'top_rated' | 'upcoming' | 'search';
  query: string;
  setCategory: (category: 'popular' | 'top_rated' | 'upcoming' | 'search') => void;
  setQuery: (query: string) => void;
  setView: (view: 'queue' | 'watched' | null) => void;
  setPage: (page: number) => void;
  loadMovies: () => void;
  addToQueue: (movie: MinimalMovie) => void;
  addToWatched: (movie: MinimalMovie) => void;
  removeFromQueue: (movie: MinimalMovie) => void;
  removeFromWatched: (movie: MinimalMovie) => void;
  isMovieInQueue: (movie: MinimalMovie) => boolean;
  isMovieInWatched: (movie: MinimalMovie) => boolean;
}

export const useStore = create<Store>((set, get) => ({
  view: 'queue',
  movies: [],
  totalPages: 0,
  currentPage: 1,
  category: 'popular',
  query: '',

  setView: (view) => {
    set({ view, currentPage: 1 }); // Reset currentPage on view change
    get().loadMovies();
  },

  setPage: (page) => {
    set({ currentPage: page });
    get().loadMovies();
  },

  loadMovies: () => {
    const view = get().view;
    const currentPage = get().currentPage;
    let movies: MinimalMovie[] = [];

    if (view === 'queue') {
      movies = getQueue();
    } else if (view === 'watched') {
      movies = getWatched();
    }

    const ITEMS_PER_PAGE = 20;
    const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);

    set({
      movies: movies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
      totalPages,
    });
  },

  setCategory: (category) => {
    set({ category });
  },

  setQuery: (query) => {
    set({ query });
  },

  addToQueue: (movie) => {
    addToQueue(movie);
    get().loadMovies(); // Refresh the movies list
  },

  addToWatched: (movie) => {
    addToWatched(movie);
    get().loadMovies(); // Refresh the movies list
  },

  removeFromQueue: (movie) => {
    removeFromQueue(movie);
    get().loadMovies(); // Refresh the movies list
  },

  removeFromWatched: (movie) => {
    removeFromWatched(movie);
    get().loadMovies(); // Refresh the movies list
  },

  isMovieInQueue: (movie) => {
    return getQueue().some((m) => m.id === movie.id);
  },

  isMovieInWatched: (movie) => {
    return getWatched().some((m) => m.id === movie.id);
  },
}));
