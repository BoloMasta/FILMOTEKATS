// Base and common types
export interface Genre {
  id: number;
  name: string;
}

export interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface GalleryProps {
  movies: MinimalMovie[];
}

export interface MovieModalProps {
  movieId: number;
  onClose: () => void;
}

export interface ThemeSwitchProps {
  isDarkTheme: boolean;
  onToggleTheme: () => void;
}

// Interfaces for Movie
export interface MinimalMovie {
  id: number;
  title: string;
  poster_path: string | null;
}

export interface MovieDetails extends MinimalMovie {
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  backdrop_path: string | null;
  original_title: string;
  budget: number;
  runtime: number | null;
  imdb_id: string | null;
  genres: Genre[];
  spoken_languages: Language[];
  homepage: string | undefined;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
}

// Interfaces for API reponses
export interface MovieListResponse {
  page: number;
  results: MinimalMovie[];
  total_pages: number;
  total_results: number;
}

export interface GenresIdsListResponse {
  genres: Genre[];
}
