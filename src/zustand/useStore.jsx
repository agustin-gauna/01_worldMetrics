import { create } from "zustand";

const useStore = create((set) => ({
  countriesCount: 0,
  setCountriesCount: (count) => set({ countriesCount: count }),

  sortOption: "Name (Asc)",
  setSortOption: (option) => set({ sortOption: option }),
}));

export default useStore;
