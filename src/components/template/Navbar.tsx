import { useState } from "react";

import { IconButton } from "@/components/ui/IconButton";
import { SearchInput } from "@/components/ui/SearchInput";
import { useMoviesStore } from "@/store";
import backIcon from "@/assets/images/Back.png";
import navBarImage from "@/assets/images/nav_bar.png";
import searchIcon from "@/assets/images/search.png";

export const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { setSearchTerm } = useMoviesStore();

  const handleClose = () => {
    setShowSearch(false);
    setSearchTerm("");
  };

  return (
    <nav className="sticky top-0 z-10 w-full h-20">
      {/* I can use a gradient here instead of image to increase performance */}
      <img
        src={navBarImage}
        alt="navbar background"
        draggable={false}
        className="absolute bottom-0 w-full h-full pointer-events-none"
      />
      <div className="flex justify-between items-start pt-2.5 h-full px-4 gap-4 w-full overflow-hidden relative z-30 container mx-auto">
        {showSearch ? (
          <SearchInput onClose={handleClose} />
        ) : (
          <div className="flex items-center gap-2">
            <IconButton
              src={backIcon}
              alt="back"
              onClick={() => window.history.back()}
            />
            <h1 className="text-lg">Romantic Movies</h1>
          </div>
        )}

        {!showSearch && (
          <IconButton
            src={searchIcon}
            alt="search"
            onClick={() => setShowSearch(true)}
          />
        )}
      </div>
    </nav>
  );
};
