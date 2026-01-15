import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Favorite {
  id: string;
  name: string;
  alias: string;
  lat: number;
  lon: number;
}

export type AddFavoriteResult =
  | { success: true }
  | { success: false; reason: "max_reached" | "duplicate" };

interface FavoritesState {
  favorites: Favorite[];
  maxFavorites: number;

  // Actions
  addFavorite: (favorite: Favorite) => AddFavoriteResult;
  removeFavorite: (id: string) => void;
  updateAlias: (id: string, alias: string) => void;
  isFavorite: (id: string) => boolean;
  getFavorite: (id: string) => Favorite | undefined;
}

const MAX_FAVORITES = 6;

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      maxFavorites: MAX_FAVORITES,

      addFavorite: (favorite) => {
        const { favorites } = get();

        if (favorites.length >= MAX_FAVORITES) {
          return { success: false, reason: "max_reached" };
        }

        if (favorites.some((f) => f.id === favorite.id)) {
          return { success: false, reason: "duplicate" };
        }

        set({ favorites: [...favorites, favorite] });
        return { success: true };
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        }));
      },

      updateAlias: (id, alias) => {
        set((state) => ({
          favorites: state.favorites.map((f) =>
            f.id === id ? { ...f, alias } : f
          ),
        }));
      },

      isFavorite: (id) => {
        return get().favorites.some((f) => f.id === id);
      },

      getFavorite: (id) => {
        return get().favorites.find((f) => f.id === id);
      },
    }),
    {
      name: "weather_favorites", // localStorage key
    }
  )
);
