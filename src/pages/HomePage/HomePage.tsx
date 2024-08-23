// HomePage.tsx
import { useEffect, useState } from "react";
import { FetchApiMovies } from "../../ts/api/fetchMovies";
import { Movie } from "../../ts/types/Movie";
import Gallery from "../../components/Gallery/Gallery";
import Pagination from "../../components/Pagination/Pagination"; 


const HomePage: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchPopularMovies = async (page: number) => {
      const api = new FetchApiMovies();
      const data = await api.getTrending(page);
      if (data && data.results) {
        setPopularMovies(data.results.slice(0, 20));
        setTotalPages(data.total_pages / 2); 
      }
    };

    fetchPopularMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2 className="page-header">Popular Movies</h2>
      <Gallery movies={popularMovies} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HomePage;
