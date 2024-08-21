export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    genre_ids: number[];
    vote_average: number;
    vote_count: number;
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface MovieListResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  
  export interface MovieDetailsResponse extends Movie {
    genres: Genre[];
    budget: number;
    revenue: number;
    runtime: number | null;
  }
  
  export interface GenresIdsListResponse {
    genres: Genre[];
  }
  