import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../utils/store';
import Gallery from '../components/Gallery/Gallery';
import Pagination from '../components/Pagination/Pagination';
import './pagesStyles.scss';

const LibraryPage: React.FC = () => {
  const { view } = useParams<{ view?: string }>();
  const {
    currentPage,
    totalPages,
    movies,
    setView,
    setPage,
    loadMovies,
    view: currentView,
  } = useStore((state) => ({
    view: state.view,
    movies: state.movies,
    totalPages: state.totalPages,
    currentPage: state.currentPage,
    setView: state.setView,
    setPage: state.setPage,
    loadMovies: state.loadMovies,
  }));

  useEffect(() => {
    if (view === 'queue' || view === 'watched') {
      setView(view);
    }
  }, [view, setView]);

  useEffect(() => {
    loadMovies();
  }, [currentView, currentPage, loadMovies]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <h2 className="pageHeaderStyle">
        {currentView === 'queue' ? 'Movie Queue' : 'Watched Movies'}
      </h2>
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

export default LibraryPage;
