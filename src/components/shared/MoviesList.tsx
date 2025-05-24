import { useCallback, useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import type { MovieData } from "../../@types";
import { useDebounceCallback } from "usehooks-ts";
import { useSearch } from "../../store";
import { Loader } from "../template/Loader";

export const MoviesList = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchTerm } = useSearch();

  console.log({ movies, isLoading, isLoadingMore, hasMore, currentPage });

  //  I prefer using combo of react-query + axios for APIs handling, but since the task is to fetch from a static JSON, I will use fetch API.
  //  All this can be improved for cleaner code using a custom hook ie. useMovies

  const fetchMovies = useCallback(async (page: number) => {
    if (isLoading) return;
    try {
      if (page === 1) {
        setIsLoading(true);
      }
      const response = await fetch(
        `https://test.create.diagnal.com/data/page${page}.json`
      );

      if (!response.ok) {
        setHasMore(false);
        throw new Error(`Page ${page} not found`);
      }

      const data = await response.json();
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
        document.documentElement.scrollHeight - 50 &&
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

  if (isLoading) {
    return <Loader content="Movies are loading..." />;
  }

  return (
    <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mx-auto w-full">
      {filteredMovies?.map((movie, index) => (
        <MovieCard key={`${movie?.name}-${index}`} movie={movie} />
      ))}
      {isLoadingMore && (
        <div className="col-span-full flex justify-center py-4">
          <div>Loading movies...</div>
        </div>
      )}
      {!hasMore && movies?.length > 0 && (
        <div className="col-span-full flex justify-center py-4 text-gray-400 text-sm">
          No more movies to load.
        </div>
      )}
    </div>
  );
};
