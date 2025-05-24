import type { MovieData } from "../../@types";

export const MovieCard = ({ movie }: { movie: MovieData }) => {
  return (
    <div
      className="aspect-[2/3] focus:scale-105 hover:scale-105 active:scale-105 transition-transform duration-300 outline-none"
      tabIndex={0}
    >
      <img
        src={`https://test.create.diagnal.com/images/${movie["poster-image"]}`}
        alt={movie.name}
        className="w-full h-auto rounded"
        loading="lazy"
        draggable={false}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://test.create.diagnal.com/images/placeholder_for_missing_posters.png";
        }}
      />
      <h3
        className="mt-2 text-lg truncate whitespace-nowrap"
        title={movie.name}
      >
        {movie.name}
      </h3>
    </div>
  );
};
