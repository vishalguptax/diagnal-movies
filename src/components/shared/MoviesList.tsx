import useOrientation from "@/hooks/useOrientation";
import { Loader } from "../template/Loader";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { MovieCard } from "./MovieCard";
import useMovies from "@/hooks/apis/useMovies";

export const MoviesList = () => {
  const { movies, isLoading, isLoadingMore, hasMore, searchTerm } = useMovies();
  const { isLandscape } = useOrientation();
  const { gridRef } = useKeyboardNavigation(movies.length);

  // Use a grid layout that adapts based on the orientation of the device
  const gridClassName = isLandscape
    ? "grid grid-cols-5 gap-4 sm:gap-6 mx-auto w-full"
    : "grid grid-cols-3 gap-4 sm:gap-6 mx-auto w-full";

  if (isLoading) {
    return <Loader content="Movies are loading..." />;
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      {movies?.length > 0 && !!searchTerm && (
        <div className="mb-4 text-center">{movies?.length} movies found.</div>
      )}
      <div ref={gridRef} className={gridClassName}>
        {movies.map((movie, index) => (
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
