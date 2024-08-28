import { create } from "zustand";
// import { FetchApiMovies } from "./../ts/api/fetchMovies";
import { MinimalMovie } from "./../ts/types/movieTypes";
// import { Genre } from "./../ts/types/commonTypes";
import { getQueue, getWatched } from "./../utils/storageUtils";

interface Store {
  // genres: Genre[];
  view: "queue" | "watched" | null;
  movies: MinimalMovie[];
  // fetchGenres: () => Promise<void>;
  setView: (view: "queue" | "watched" | null) => void;
  loadMovies: () => void;
}

export const useStore = create<Store>((set, get) => ({
  // genres: [],
  view: null,
  movies: [],
  // fetchGenres: async () => {
  //   const api = new FetchApiMovies();
  //   const genresListResponse = await api.getGenresIdsList();
  //   if (genresListResponse && genresListResponse.genres) {
  //     set({ genres: genresListResponse.genres });
  //     localStorage.setItem("genres", JSON.stringify(genresListResponse.genres));
  //   }
  // },
  setView: (view) => {
    set({ view });
    get().loadMovies();
  },
  loadMovies: () => {
    const view = get().view;
    let movies: MinimalMovie[] = [];
    if (view === "queue") {
      movies = getQueue();
    } else if (view === "watched") {
      movies = getWatched();
    }
    set({ movies });
  },
}));
