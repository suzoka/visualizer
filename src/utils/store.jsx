import { create } from "zustand";

const useStore = create((set) => ({
  defaultTracks: [],
  tracks: [],

  setTracks: (_tracks) =>
    set((state) => {

      const filteredSearchedTracks = [..._tracks].filter(
        (searchedTrack) => !state.defaultTracks.some(
          (defaultTrack) => defaultTrack.link === searchedTrack.link
        )
      );

      const updatedState = {
        ...state,
        tracks: _tracks,
        combinedTracks: [...state.defaultTracks, ...filteredSearchedTracks],
      };
      return updatedState;
    }),

  setDefaultTracks: (_tracks) =>
    set((state) => {
      const updatedState = {
        ...state,
        defaultTracks: _tracks,
        combinedTracks: [..._tracks, ...state.tracks],
      };
      return updatedState;
    }),

  addToDefaultTracks: (track) =>
    set((state) => {
      const isTrackAlreadyPresent = state.defaultTracks.some(
        (defaultTrack) => defaultTrack.link === track.link
      );

      // Si le titre est déjà présent, ne rien faire
      if (isTrackAlreadyPresent) {
        return state;
      }

      const updatedDefaultTracks = [...state.defaultTracks, track];

      const filteredDefaultTracks = updatedDefaultTracks.filter(
        (defaultTrack) => !state.tracks.some(
          (searchedTrack) => searchedTrack.link === defaultTrack.link
        )
      );

      const updatedState = {
        ...state,
        defaultTracks: updatedDefaultTracks,
        combinedTracks: [...filteredDefaultTracks, ...state.tracks],
      };
      return updatedState;
    }),

  combinedTracks: [],

  showTracks: false,
  toggleShowTracks: () =>
    set((state) => {
      const updatedState = {
        ...state,
        showTracks: !state.showTracks,
      };
      return updatedState;
    }),

  activeTrackId: null,
  setActiveTrackId: (id) =>
    set((state) => ({
      ...state,
      activeTrackId: id,
    })),
}));

export default useStore;