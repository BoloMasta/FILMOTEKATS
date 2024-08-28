import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQueue, getWatched } from "../utils/storageUtils";
import Gallery from "../components/Gallery/Gallery";
import Pagination from "../components/Pagination/Pagination";
import { MinimalMovie } from "../ts/types/movieTypes";
import "./pagesStyles.scss";

const ITEMS_PER_PAGE = 20;

const LibraryPage: React.FC = () => {
  const { view } = useParams<{ view?: string }>();
  const [currentView, setCurrentView] = useState<"queue" | "watched">("queue");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentMovies, setCurrentMovies] = useState<MinimalMovie[]>([]);

  // Effect to handle view change based on URL parameter
  useEffect(() => {
    if (view === "queue" || view === "watched") {
      setCurrentView(view);
    }
  }, [view]);

  // Effect to fetch and set movies based on current view and page
  useEffect(() => {
    const fetchMovies = () => {
      let moviesList: MinimalMovie[] = [];
      if (currentView === "queue") {
        moviesList = getQueue();
      } else if (currentView === "watched") {
        moviesList = getWatched();
      }

      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setCurrentMovies(moviesList.slice(startIndex, endIndex));
      setTotalPages(Math.ceil(moviesList.length / ITEMS_PER_PAGE));
    };

    fetchMovies();
  }, [currentView, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h2 className="pageHeaderStyle">
        {currentView === "queue" ? "Movie Queue" : "Watched Movies"}
      </h2>
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
