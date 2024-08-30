import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { MovieListResponse, GenresIdsListResponse } from '../types/apiTypes';
import { MovieDetails } from '../types/movieTypes';

const apiKey = '92be59e0090ddfe5570b8756c403476a';

export class FetchApiMovies {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: apiKey,
        language: 'en-US',
        include_adult: false,
      },
    });
  }

  private async fetchData<T>(url: string, params?: object): Promise<T | undefined> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error('Opss, something went wrong', error);
    }
  }

  getTrending(page: number): Promise<MovieListResponse | undefined> {
    return this.fetchData<MovieListResponse>('/trending/movie/day', { page });
  }

  getSearch(query: string, page: number): Promise<MovieListResponse | undefined> {
    return this.fetchData<MovieListResponse>('/search/movie', { query, page });
  }

  getMovieDetails(movie_id: number): Promise<MovieDetails | undefined> {
    return this.fetchData<MovieDetails>(`/movie/${movie_id}`);
  }

  getKeywords(movie_id: number): Promise<MovieDetails | undefined> {
    return this.fetchData<MovieDetails>(`/movie/${movie_id}/keywords`);
  }

  getSimilar(movie_id: number): Promise<MovieDetails | undefined> {
    return this.fetchData<MovieDetails>(`/movie/${movie_id}/similar`);
  }

  getReviews(movie_id: number): Promise<MovieDetails | undefined> {
    return this.fetchData<MovieDetails>(`/movie/${movie_id}/reviews`);
  }

  getTopRated(page: number): Promise<MovieListResponse | undefined> {
    return this.fetchData<MovieListResponse>('/movie/top_rated', { page });
  }

  getUpcoming(page: number): Promise<MovieListResponse | undefined> {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const queryParams = {
      page,
      'primary_release_date.gte': today,
      sort_by: 'primary_release_date.asc', // Sort results by release date in ascending order
    };
    return this.fetchData<MovieListResponse>('/discover/movie', queryParams);
  }

  getGenresIdsList(): Promise<GenresIdsListResponse | undefined> {
    return this.fetchData<GenresIdsListResponse>('/genre/movie/list');
  }
}
