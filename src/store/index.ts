import { create } from "zustand";

import type { SearchState } from "../@types";

export const useSearch = create<SearchState>()((set) => ({
  searchTerm: "",
  setSearchTerm: (term: string) => set({ searchTerm: term }),
}));
