// src/store.ts
import create from 'zustand';
import { FetchApiMovies } from './../ts/api/fetchMovies';

interface Genre {
  id: number;
  name: string;
}

interface Store {
  genres: Genre[];
  fetchGenres: () => Promise<void>;
}

export const useStore = create<Store>((set) => ({
  genres: [],
  fetchGenres: async () => {
    // Pobierz dane z API
    const api = new FetchApiMovies();
    const genresListResponse = await api.getGenresIdsList();
    if (genresListResponse && genresListResponse.genres) {
      set({ genres: genresListResponse.genres });
      // Możesz również zapisać dane w localStorage, jeśli chcesz
      localStorage.setItem('genres', JSON.stringify(genresListResponse.genres));
    }
  },
}));
