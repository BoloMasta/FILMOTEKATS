import { useEffect, useState } from "react";
import { FetchApiMovies } from "../../ts/api/fetchMovies";
import { Movie } from "../../ts/types/Movie";
import Gallery from "../../components/Gallery/Gallery";

const HomePage: React.FC = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const api = new FetchApiMovies();
      const data = await api.getTrending(1);
      if (data && data.results) {
        setPopularMovies(data.results.slice(0, 20));
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h2>Popular Movies</h2>
      <Gallery movies={popularMovies} />
    </div>
  );
};

export default HomePage;
