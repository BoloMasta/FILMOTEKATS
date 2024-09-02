import { Genre, Image } from './commonTypes';
import { MinimalMovie } from './movieTypes';

export interface MovieListResponse {
  page: number;
  results: MinimalMovie[];
  total_pages: number;
  total_results: number;
}

export interface GenresIdsListResponse {
  genres: Genre[];
}

export interface MovieImagesResponse {
  backdrops: Image[];
}
