import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom'; // Dodaj import useSearchParams
import { FetchApiMovies } from '../ts/api/fetchMovies';
import { MinimalMovie } from '../ts/types/movieTypes';
import Gallery from '../components/Gallery/Gallery';
import Pagination from '../components/Pagination/Pagination';
import Button from '../components/Button/Button';
import './pagesStyles.scss';
import { useStore } from '../utils/store';

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<MinimalMovie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams(); // Użyj useSearchParams

  const { category, query, setCategory, setQuery, adults } = useStore((state) => ({
    category: state.category,
    query: state.query,
    setCategory: state.setCategory,
    setQuery: state.setQuery,
    adults: state.adults,
  }));

  const fetchMovies = useCallback(
    async (
      page: number,
      category: 'popular' | 'top_rated' | 'upcoming' | 'search',
      query?: string
    ) => {
      console.log(`Fetching movies for category: ${category}, page: ${page}, query: "${query}"`);
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
          console.log(`Movies fetched: ${data.results.length} movies, totalPages: ${maxPages}`);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    []
  );

  useEffect(() => {
    fetchMovies(currentPage, category, query);
  }, [currentPage, category, query, fetchMovies, adults]);

  const handlePageChange = (page: number) => {
    console.log(`Page change: new page=${page}`);
    setCurrentPage(page);
  };

  const handleCategoryChange = (newCategory: 'popular' | 'top_rated' | 'upcoming' | 'search') => {
    setCurrentPage(1);

    if (newCategory !== 'search') {
      setQuery(''); // Wyczyść query
      searchParams.delete('query'); // Usuń query z URL-a
      setSearchParams(searchParams); // Zaktualizuj URL
    }

    setCategory(newCategory);
    console.log(`Category change: new category=${newCategory}`);
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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default HomePage;
