import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  MovieListResponse, 
  MovieDetailsResponse, 
  GenresIdsListResponse 
} from '../types/Movie';

const apiKey = '92be59e0090ddfe5570b8756c403476a';

export class FetchApiMovies {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: apiKey,
        language: 'en-US',  
      }
    });
  }

  private async fetchData<T>(url: string, params?: object): Promise<T | undefined> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, { params });
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

  getMovieDetails(movie_id: number): Promise<MovieDetailsResponse | undefined> {
    return this.fetchData<MovieDetailsResponse>(`/movie/${movie_id}`);
  }

  getGenresIdsList(): Promise<GenresIdsListResponse | undefined> {
    return this.fetchData<GenresIdsListResponse>('/genre/movie/list');
  }
}
