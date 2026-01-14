import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Favorite {
  id: string;
  name: string;
  alias: string;
  lat: number;
  lon: number;
}

interface FavoritesState {
  favorites: Favorite[];
  maxFavorites: number;

  // Actions
  addFavorite: (favorite: Favorite) => void;
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
          alert(`최대 ${MAX_FAVORITES}개까지만 추가할 수 있습니다.`);
          return;
        }

        if (favorites.some((f) => f.id === favorite.id)) {
          alert("이미 즐겨찾기에 추가된 장소입니다.");
          return;
        }

        set({ favorites: [...favorites, favorite] });
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
