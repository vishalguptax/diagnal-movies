import { useState, useCallback, memo } from "react";
import type { MovieData } from "../../types";
import { envs } from "@/constants/envs";

export const MovieCard = memo(({ movie }: { movie: MovieData }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const posterImg = `${envs.API_BASE_URL}/images/${movie["poster-image"]}`;
  const placeholderImg = `${envs.API_BASE_URL}/images/placeholder_for_missing_posters.png`;

  // Use the correct image source based on load state
  const currentSrc = imageError || !imageLoaded ? placeholderImg : posterImg;

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  return (
    <div
      className="group aspect-[2/3] focus:scale-105 hover:scale-105 active:scale-105 hover:shadow-xl transition-transform duration-300 outline-none cursor-pointer"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${movie.name}`}
    >
      <div className="relative w-full h-full overflow-hidden rounded">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-600 animate-pulse flex items-center justify-center">
            <div className="text-gray-300 text-xs">Loading...</div>
          </div>
        )}

        <img
          src={currentSrc}
          alt={movie.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          draggable={false}
          onLoad={handleImageLoad}
          onError={(e) => {
            handleImageError();
            (e.target as HTMLImageElement).src = placeholderImg;
          }}
          decoding="async"
        />
      </div>

      <h3
        className="mt-2 text-sm sm:text-lg font-medium truncate"
        title={movie.name}
      >
        {movie.name}
      </h3>
    </div>
  );
});
