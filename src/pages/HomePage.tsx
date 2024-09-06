import { useEffect, useState, useCallback } from 'react';
import { useStore } from '../utils/store';
import { FetchApiMovies } from '../ts/api/fetchMovies';
import { MinimalMovie } from '../ts/types/movieTypes';
import Gallery from '../components/Gallery/Gallery';
import Pagination from '../components/Pagination/Pagination';
import Button from '../components/Button/Button';
import './pagesStyles.scss';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<MinimalMovie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { category, query, setCategory, setQuery, adults } = useStore((state) => ({
    category: state.category,
    query: state.query,
    setCategory: state.setCategory,
    setQuery: state.setQuery,
    adults: state.adults,
  }));

  const [fetchParams, setFetchParams] = useState<{
    page: number;
    category: 'popular' | 'top_rated' | 'upcoming' | 'search';
    query?: string;
  }>({
    page: 1,
    category: category,
    query: query,
  });

  const fetchMovies = useCallback(
    async (
      page: number,
      category: 'popular' | 'top_rated' | 'upcoming' | 'search',
      query?: string
    ) => {
      const api = new FetchApiMovies();
      let data;

      try {
        switch (category) {
          case 'search':
            if (query) data = await api.getSearch(query, page);
            break;
          case 'top_rated':
            data = await api.getTopRated(page);
            break;
          case 'upcoming':
            data = await api.getUpcoming(page);
            break;
          case 'popular':
          default:
            data = await api.getTrending(page);
            break;
        }

        if (data && data.results) {
          const maxPages = Math.min(data.total_pages, 500);
          setMovies(data.results);
          setTotalPages(maxPages);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    []
  );

  useEffect(() => {
    fetchMovies(fetchParams.page, fetchParams.category, fetchParams.query);
  }, [fetchParams, fetchMovies]);

  useEffect(() => {
    setFetchParams({
      page: 1,
      category: category,
      query: query,
    });
  }, [category, query, adults]);

  const handlePageChange = (page: number) => {
    setFetchParams((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const handleCategoryChange = (newCategory: 'popular' | 'top_rated' | 'upcoming' | 'search') => {
    if (newCategory !== 'search') {
      setQuery('');
    }
    setCategory(newCategory);
  };

  return (
    <>
      <h2 className="pageHeaderStyle">
        {category === 'search' && query
          ? `Search Results for "${query}"`
          : category === 'popular'
            ? 'Popular Movies'
            : category === 'top_rated'
              ? 'Top Rated Movies'
              : category === 'upcoming'
                ? 'Upcoming Movies'
                : ''}
      </h2>

      <div className="buttonGroup">
        <Button
          onClick={() => handleCategoryChange('popular')}
          className={category === 'popular' ? 'activeButton' : ''}
          label="Popular Movies"
        />
        <Button
          onClick={() => handleCategoryChange('top_rated')}
          className={category === 'top_rated' ? 'activeButton' : ''}
          label="Top Rated"
        />
        <Button
          onClick={() => handleCategoryChange('upcoming')}
          className={category === 'upcoming' ? 'activeButton' : ''}
          label="Upcoming"
        />
      </div>

      <Gallery movies={movies} />

      {totalPages > 1 && (
        <Pagination
          currentPage={fetchParams.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default HomePage;
