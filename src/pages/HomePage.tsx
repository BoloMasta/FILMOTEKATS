import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { FetchApiMovies } from "../ts/api/fetchMovies";
import { MinimalMovie } from "../ts/types/movieTypes";
import Gallery from "../components/Gallery/Gallery";
import Pagination from "../components/Pagination/Pagination";
import "./pagesStyles.scss";

const HomePage: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<MinimalMovie[]>([]);
  const [searchResults, setSearchResults] = useState<MinimalMovie[] | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const fetchMovies = useCallback(async (page: number, query?: string) => {
    const api = new FetchApiMovies();
    const data = query ? await api.getSearch(query, page) : await api.getTrending(page);

    if (data && data.results) {
      if (query) {
        setSearchResults(data.results);
        setTotalPages(data.total_pages);
      } else {
        setPopularMovies(data.results.slice(0, 20));
        setTotalPages(data.total_pages / 2);
        setSearchResults(null);
      }
    }
  }, []);

  useEffect(() => {
    fetchMovies(pageParam, query || undefined);
  }, [pageParam, query, fetchMovies]);

  const handlePageChange = (page: number) => {
    setSearchParams({ query: query || "", page: page.toString() });
  };

  return (
    <div>
      <h2 className="pageHeaderStyle">{searchResults ? "Search Results" : "Popular Movies"}</h2>
      <Gallery movies={searchResults || popularMovies} />
      {totalPages > 1 && (
        <Pagination
          currentPage={pageParam}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default HomePage;
