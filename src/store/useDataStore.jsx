import {create} from "zustand";

const useDataStore = create((set) => ({
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}));

export default useDataStore;
