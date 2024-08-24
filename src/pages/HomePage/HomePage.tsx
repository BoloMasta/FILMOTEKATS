import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FetchApiMovies } from '../../ts/api/fetchMovies';
import { Movie } from '../../ts/types/Movie';
import Gallery from '../../components/Gallery/Gallery';
import Pagination from '../../components/Pagination/Pagination';

const HomePage: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');
  const pageParam = searchParams.get('page') || '1';

  // Fetch movies based on page and query
  const fetchMovies = useCallback(async (page: number, query?: string) => {
    const api = new FetchApiMovies();
    const data = query
      ? await api.getSearch(query, page)
      : await api.getTrending(page);

    if (data && data.results) {
      if (query) {
        setSearchResults(data.results);
        setTotalPages(data.total_pages);
      } else {
        setPopularMovies(data.results.slice(0, 20));
        setTotalPages(Math.ceil(data.total_pages / 2));
        setSearchResults(null);
      }
    }
  }, []);

  // Effect to synchronize current page with URL
  useEffect(() => {
    const page = parseInt(pageParam, 10);
    setCurrentPage(page);
    fetchMovies(page, query || undefined);
  }, [pageParam, query, fetchMovies]);

  // Handle page change and update URL
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ query: query || '', page: page.toString() });
  };

  // Reset page and search results when query changes
  useEffect(() => {
    setSearchParams({ query: query || '', page: '1' });
    setCurrentPage(1);
  }, [query]);



  const pageHeaderStyle = {
    padding: '0.5rem',
    borderBottom: '1px solid var(--primary-color)',
    marginBottom: '1rem',
  };

  return (
    <div>
      <h2 className="page-header" style={pageHeaderStyle}>
        {searchResults ? 'Search Results' : 'Popular Movies'}
      </h2>
      <Gallery movies={searchResults || popularMovies} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default HomePage;
