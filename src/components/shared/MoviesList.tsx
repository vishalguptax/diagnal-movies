import { useCallback, useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import type { MovieData } from "../../@types";
import { useDebounceCallback } from "usehooks-ts";
import { useSearch } from "../../store";
import { Loader } from "../template/Loader";
import { getMoviesApi } from "../../services";

export const MoviesList = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchTerm } = useSearch();

  console.log({ movies, isLoading, isLoadingMore, hasMore, currentPage });

  //  I prefer using combo of react-query + axios for APIs handling, but since the task small, I went with this.
  //  All this can be improved for cleaner code using a custom hook ie. useMovies

  const fetchMovies = useCallback(async (page: number) => {
    if (isLoading) return;
    try {
      if (page === 1) {
        setIsLoading(true);
      }
      const { data } = await getMoviesApi({ page });
      const newMovies = data.page["content-items"].content as MovieData[];
      const totalItems = Number(data.page["total-content-items"]);

      setMovies((prevMovies) => {
        const updatedMovies = [...prevMovies, ...newMovies];
        if (updatedMovies?.length >= totalItems) {
          setHasMore(false);
        }
        return updatedMovies;
      });
    } catch (error) {
      console.error("Error fetching movies:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, fetchMovies]);

  const handleLoadMore = useDebounceCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100 &&
      hasMore &&
      !isLoadingMore
    ) {
      setIsLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleLoadMore);
    return () => window.removeEventListener("scroll", handleLoadMore);
  }, [handleLoadMore]);

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridClassName = isLandscape
    ? "grid grid-cols-5 gap-4 sm:gap-6 mx-auto w-full"
    : "grid grid-cols-3 gap-4 sm:gap-6 mx-auto w-full";

  if (isLoading) {
    return <Loader content="Movies are loading..." />;
  }

  return (
    <div className="flex flex-1 flex-col h-full overflow-y-auto">
      {movies?.length > 0 && !!searchTerm && (
        <div className="mb-4 text-center">
          {filteredMovies?.length} movies found.
        </div>
      )}
      <div className={gridClassName}>
        {filteredMovies.map((movie, index) => (
          <MovieCard key={`${movie?.name}-${index}`} movie={movie} />
        ))}
      </div>
      {isLoadingMore && (
        <div className="flex justify-center py-4">
          <div>Loading movies...</div>
        </div>
      )}
      {!hasMore && movies?.length > 0 && !searchTerm && (
        <div className="flex justify-center py-4 text-gray-400 text-sm">
          No more movies to load.
        </div>
      )}
    </div>
  );
};
