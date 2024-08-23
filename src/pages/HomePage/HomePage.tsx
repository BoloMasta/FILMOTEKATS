import { useEffect, useState } from "react";
import { FetchApiMovies } from "../../ts/api/fetchMovies";
import { Movie } from "../../ts/types/Movie";
import Gallery from "../../components/Gallery/Gallery";
import Pagination from "../../components/Pagination/Pagination";
import SearchForm from "../../components/SearchForm/SearchForm"; // Import SearchForm

const HomePage: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[] | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

  const fetchMovies = async (page: number, query?: string) => {
    const api = new FetchApiMovies();
    const data = query
      ? await api.getSearch(query, page)
      : await api.getTrending(page);

    if (data && data.results) {
      if (query) {
        setSearchResults(data.results);
      } else {
        setPopularMovies(data.results.slice(0, 20));
        setTotalPages(data.total_pages / 2); // Assuming total pages is based on a larger dataset
      }
    }
  };

  useEffect(() => {
    fetchMovies(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchResults = (movies: Movie[]) => {
    setSearchResults(movies);
    setCurrentPage(1); // Reset to the first page of search results
  };

  return (
    <div>
      <h2 className="page-header">Popular Movies</h2>
      <SearchForm onSearchResults={handleSearchResults} />
      <Gallery movies={searchResults || popularMovies} />
      {searchResults ? null : (
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
