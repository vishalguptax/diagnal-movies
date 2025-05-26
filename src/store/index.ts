import type { MoviesState } from "@/types";

import { create } from "zustand";

export const useMoviesStore = create<MoviesState>()((set) => ({
  movies: [],
  // setMovies: (movies: MovieData[]) => set({ movies }),

  setMovies: (arg) =>
    set((state) => ({
      movies: typeof arg === "function" ? arg(state.movies) : arg,
    })),

  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  isLoadingMore: false,
  setIsLoadingMore: (isLoadingMore: boolean) => set({ isLoadingMore }),

  hasMore: true,
  setHasMore: (hasMore: boolean) => set({ hasMore }),

  currentPage: 1,
  setCurrentPage: (arg) =>
    set((state) => ({
      currentPage: typeof arg === "function" ? arg(state.currentPage) : arg,
    })),

  isLandscape:
    typeof window !== "undefined"
      ? window.innerWidth > window.innerHeight
      : true,
  setIsLandscape: (value) => set({ isLandscape: value }),
  searchTerm: "",
  setSearchTerm: (term: string) => set({ searchTerm: term }),
}));
