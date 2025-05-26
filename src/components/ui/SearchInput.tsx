import { useRef } from "react";
import { useSearch } from "../../store";
import { IconButton } from "./IconButton";

type SearchInputProps = {
  onClose: () => void;
};

export const SearchInput = ({ onClose }: SearchInputProps) => {
  const { setSearchTerm, searchTerm } = useSearch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <IconButton imgPath="Back.png" alt="back" onClick={onClose} />
      <div className="relative flex-1">
        <input
          type="text"
          ref={searchRef}
          onChange={handleSearch}
          value={searchTerm}
          placeholder="Search Romantic Movies..."
          autoFocus
          className="px-4 py-1.5 text-sm placeholder:text-sm w-full border-foreground focus:outline-none border-2 bg-background/10 text-foreground placeholder-foreground/70 rounded-full"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              searchRef.current?.focus();
            }}
            className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
