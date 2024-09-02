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
  toggleQueueStatus: (movie: MinimalMovie, add: boolean) => void;
  toggleWatchedStatus: (movie: MinimalMovie, add: boolean) => void;
  isMovieInList: (movie: MinimalMovie, listType: 'queue' | 'watched') => boolean;
}

const ITEMS_PER_PAGE = 20;

export const useStore = create<Store>((set, get) => ({
  adults: false,
  view: 'queue',
  movies: [],
  totalPages: 0,
  currentPage: 1,
  category: 'popular',
  query: '',

  setAdults: (adults: boolean) => set({ adults }),

  setView: (view: 'queue' | 'watched' | null) => {
    set({ view, currentPage: 1 });
    get().loadMovies();
  },

  setPage: (page: number) => {
    set({ currentPage: page });
    get().loadMovies();
  },

  loadMovies: () => {
    const { view, currentPage } = get();
    let movies: MinimalMovie[] = [];

    switch (view) {
      case 'queue':
        movies = getQueue();
        break;
      case 'watched':
        movies = getWatched();
        break;
      default:
        movies = [];
    }

    set({
      movies: movies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE),
      totalPages: Math.ceil(movies.length / ITEMS_PER_PAGE),
    });
  },

  setCategory: (category: 'popular' | 'top_rated' | 'upcoming' | 'search') => set({ category }),

  setQuery: (query: string) => set({ query }),

  toggleQueueStatus: (movie: MinimalMovie, add: boolean) => {
    if (add) {
      addToQueue(movie);
    } else {
      removeFromQueue(movie);
    }
    get().loadMovies();
  },

  toggleWatchedStatus: (movie: MinimalMovie, add: boolean) => {
    if (add) {
      addToWatched(movie);
    } else {
      removeFromWatched(movie);
    }
    get().loadMovies();
  },

  isMovieInList: (movie: MinimalMovie, listType: 'queue' | 'watched') => {
    const list = listType === 'queue' ? getQueue() : getWatched();
    return list.some((m) => m.id === movie.id);
  },
}));
