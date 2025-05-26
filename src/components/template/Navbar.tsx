import { useState } from "react";
import { SearchInput } from "../ui/SearchInput";
import { IconButton } from "../ui/IconButton";

export const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  const handleClose = () => {
    setShowSearch(false);
  };

  return (
    <nav className="sticky top-0 z-10 w-full h-20">
      <img
        src="https://test.create.diagnal.com/images/nav_bar.png"
        alt="navbar background"
        className="absolute bottom-0 w-full h-full pointer-events-none"
      />
      <div className="flex justify-between items-start pt-2.5 h-full px-4 gap-4 w-full overflow-hidden relative z-30 container mx-auto">
        {showSearch ? (
          <SearchInput onClose={handleClose} />
        ) : (
          <h1 className="text-lg">Romantic Movies</h1>
        )}

        {!showSearch && (
          <IconButton
            imgPath="search.png"
            alt="search"
            onClick={() => setShowSearch(true)}
          />
        )}
      </div>
    </nav>
  );
};
