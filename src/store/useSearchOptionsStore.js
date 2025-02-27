import { create } from "zustand";

const useSearchOptionsStore = create((set) => ({
  showPlaceOptions: false,
  showDateOptions: false,
  showPersonsOption: false,
  setShowPlaceOptions: (value) => set({ showPlaceOptions: value }),
  setShowDateOptions: (value) => set({ showDateOptions: value }),
  setShowPersonsOption: (value) => set({ showPersonsOption: value }),
}));

export default useSearchOptionsStore;
