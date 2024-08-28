import { useEffect, useState } from "react";
import { useStore } from "../utils/store";
import { MinimalMovie } from "../ts/types/Movie";
import Gallery from "../components/Gallery/Gallery";
import Pagination from "../components/Pagination/Pagination";
import "./pagesStyles.scss";

const ITEMS_PER_PAGE = 20;

const LibraryPage: React.FC = () => {
  const { view, movies, loadMovies } = useStore((state) => ({
    view: state.view,
    movies: state.movies,
    loadMovies: state.loadMovies,
  }));

  // type MovieType = MinimalMovie | Movie;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentMovies, setCurrentMovies] = useState<MinimalMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      await loadMovies();
    };

    fetchMovies();
  }, [loadMovies]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentMovies(movies.slice(startIndex, endIndex));

    setTotalPages(Math.ceil(movies.length / ITEMS_PER_PAGE));
  }, [currentPage, movies]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h2 className="pageHeaderStyle">{view === "queue" ? "Movie Queue" : "Watched Movies"}</h2>
      <Gallery movies={currentMovies} />
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

export default LibraryPage;
