import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useStore } from '../utils/store';
import Gallery from '../components/Gallery/Gallery';
import Pagination from '../components/Pagination/Pagination';
import './pagesStyles.scss';

const validViews: Array<'queue' | 'watched'> = ['queue', 'watched'];

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
    if (view && !validViews.includes(view as 'queue' | 'watched')) {
      setView('queue');
    } else if (view) {
      setView(view as 'queue' | 'watched');
    }
  }, [view, setView]);

  useEffect(() => {
    loadMovies();
  }, [currentView, currentPage, loadMovies]);

  if (view && !validViews.includes(view as 'queue' | 'watched')) {
    return <Navigate to="/FILMOTEKATS/library/queue" />;
  }

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
