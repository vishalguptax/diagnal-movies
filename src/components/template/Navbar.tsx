import { useState } from "react";
import { useSearch } from "../../store";

export const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { setSearchTerm, searchTerm } = useSearch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <nav className="sticky top-0 z-10  w-full h-24">
      <img
        src="https://test.create.diagnal.com/images/nav_bar.png"
        alt=""
        className="absolute w-full z-20 h-full pointer-events-none"
      />
      <div className="flex justify-between items-center px-4 py-2 gap-4 container mx-auto overflow-hidden relative z-30 ">
        {showSearch ? (
          <input
            type="text"
            onChange={handleSearch}
            value={searchTerm}
            placeholder="Search Romantic Movies..."
            autoFocus
            onBlur={() => {
              if (!searchTerm) {
                setShowSearch(false);
              }
            }}
            className="px-4 py-2 w-full"
          />
        ) : (
          <h1 className="flex items-center gap-3 py-2">
            <img
              src="https://test.create.diagnal.com/images/Back.png"
              alt="back"
              className="h-4"
            />
            Romantic Movies
          </h1>
        )}

        <button
          className="flex items-center justify-center w-8 h-8 cursor-pointer"
          onClick={() => {
            setShowSearch(!showSearch);
          }}
        >
          <img
            src="https://test.create.diagnal.com/images/search.png"
            alt="search"
            className="h-4"
          />
        </button>
      </div>
    </nav>
  );
};
