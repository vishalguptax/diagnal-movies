export type MovieData = {
  name: string;
  "poster-image": string;
};

export type SearchState = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};
