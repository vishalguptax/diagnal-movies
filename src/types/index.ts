export type MovieData = {
  name: string;
  "poster-image": string;
};

export type MoviesState = {
  movies: MovieData[];
  setMovies: (arg: MovieData[] | ((prev: MovieData[]) => MovieData[])) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isLoadingMore: boolean;
  setIsLoadingMore: (loadingMore: boolean) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  currentPage: number;
  setCurrentPage: (arg: number | ((prev: number) => number)) => void;
  isLandscape: boolean;
  setIsLandscape: (value: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};
