import { Genre, Language, ProductionCompany, ProductionCountry } from "./commonTypes";

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
