import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { FetchApiMovies } from "../ts/api/fetchMovies";
import { MinimalMovie } from "../ts/types/movieTypes";
import Gallery from "../components/Gallery/Gallery";
import Pagination from "../components/Pagination/Pagination";
import Button from "../components/Button/Button";
import "./pagesStyles.scss";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<MinimalMovie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<
    "popular" | "top_rated" | "upcoming" | "search"
  >("popular");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const isResettingPage = useRef(false);

  const fetchMovies = useCallback(
    async (
      page: number,
      category: "popular" | "top_rated" | "upcoming" | "search",
      query?: string
    ) => {
      const api = new FetchApiMovies();
      let data;

      try {
        switch (category) {
          case "search":
            if (query) data = await api.getSearch(query, page);
            break;
          case "top_rated":
            data = await api.getTopRated(page);
            break;
          case "upcoming":
            data = await api.getUpcoming(page);
            break;
          case "popular":
          default:
            data = await api.getTrending(page);
            break;
        }

        if (data && data.results) {
          setMovies(data.results);
          setTotalPages(data.total_pages);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
    []
  );

  useEffect(() => {
    if (query) {
      isResettingPage.current = true;
      setActiveCategory("search");
      setCurrentPage(1);
      setSearchParams({ query, page: "1" });
    } else if (activeCategory === "search") {
      isResettingPage.current = true;
      setActiveCategory("popular");
      setCurrentPage(1);
      setSearchParams({ query: "", page: "1" });
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [query]);

  useEffect(() => {
    if (isResettingPage.current) {
      isResettingPage.current = false;
      return;
    }
    fetchMovies(currentPage, activeCategory, query);
  }, [currentPage, activeCategory, query, fetchMovies]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ query: query || "", page: page.toString() });
  };

  const handleCategoryChange = (category: "popular" | "top_rated" | "upcoming" | "search") => {
    setActiveCategory(category);
    setCurrentPage(1);
    setSearchParams({ query: category === "search" ? query : "", page: "1" });
  };

  return (
    <>
      <h2 className="pageHeaderStyle">
        {activeCategory === "search" && query
          ? `Search Results for "${query}"`
          : activeCategory === "popular"
          ? "Popular Movies"
          : activeCategory === "top_rated"
          ? "Top Rated Movies"
          : activeCategory === "upcoming"
          ? "Upcoming Movies"
          : ""}
      </h2>

      <div className="buttonGroup">
        <Button
          onClick={() => handleCategoryChange("popular")}
          className={activeCategory === "popular" ? "activeButton" : ""}
          label="Popular Movies"
        />
        <Button
          onClick={() => handleCategoryChange("top_rated")}
          className={activeCategory === "top_rated" ? "activeButton" : ""}
          label="Top Rated"
        />
        <Button
          onClick={() => handleCategoryChange("upcoming")}
          className={activeCategory === "upcoming" ? "activeButton" : ""}
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
