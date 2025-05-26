import type { MovieData } from "@/types";
import { getMoviesApi } from "@/services";
import { useMoviesStore } from "@/store";

import { useCallback, useEffect } from "react";

import { useDebounceCallback } from "usehooks-ts";

export default function useMovies() {
  const {
    movies,
    setMovies,
    isLoading,
    setIsLoading,
    isLoadingMore,
    setIsLoadingMore,
    hasMore,
    setHasMore,
    searchTerm,
    currentPage,
    setCurrentPage,
  } = useMoviesStore();

  //  I prefer using combo of axios + react-query for data fetching, but since there is a single API integration here, I have used a custom hook with Zustand for state management.

  const fetchMovies = useCallback(
    async (page: number) => {
      try {
        if (page === 1) {
          setIsLoading(true);
        }

        const { data } = await getMoviesApi({ page });
        const newMovies = data.page["content-items"].content as MovieData[];
        const totalItems = Number(data.page["total-content-items"]);

        setMovies((prevMovies) => {
          const updatedMovies = [...prevMovies, ...newMovies];

          // If the number of movies fetched + the previous movies is greater than or equal to total items, set hasMore to false to stop further fetching
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
    },
    [setMovies, setIsLoading, setHasMore, setIsLoadingMore]
  );

  // This will load the initial set of movies and subsequent pages when the user scrolls to the bottom
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, fetchMovies]);

  // Debounced scroll handler to load more movies
  // This will trigger when the user scrolls near the bottom of the page
  const handleLoadMore = useDebounceCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - 100 &&
      hasMore &&
      !isLoadingMore &&
      !isLoading
    ) {
      setIsLoadingMore(true);
      setCurrentPage(currentPage + 1);
    }
  }, 300);

  // Attach scroll event listener to load more movies when scrolled to the bottom
  // This will be removed when the component unmounts
  useEffect(() => {
    window.addEventListener("scroll", handleLoadMore);
    return () => window.removeEventListener("scroll", handleLoadMore);
  }, [handleLoadMore]);

  // Filter movies based on search term
  // This will update the displayed movies based on the search input
  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    movies: filteredMovies,
    isLoading,
    isLoadingMore,
    hasMore,
    currentPage,
    searchTerm,
  };
}
