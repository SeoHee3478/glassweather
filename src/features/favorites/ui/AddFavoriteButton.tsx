import { useFavoritesStore } from "../model/useFavoritesStore";
import type { WeatherResponse } from "@/entities/weather/model/types";

interface AddFavoriteButtonProps {
  weather: WeatherResponse;
  locationName: string;
  variant?: "full" | "icon";
}

export const AddFavoriteButton = ({
  weather,
  locationName,
  variant = "full",
}: AddFavoriteButtonProps) => {
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const favorites = useFavoritesStore((state) => state.favorites);
  const favoriteId = `${weather.coord.lat},${weather.coord.lon}`;
  const isAlreadyFavorite = favorites.some((fav) => fav.id === favoriteId);

  const handleToggleFavorite = () => {
    if (isAlreadyFavorite) {
      removeFavorite(favoriteId);
    } else {
      addFavorite({
        id: favoriteId,
        name: locationName,
        alias: "",
        lat: weather.coord.lat,
        lon: weather.coord.lon,
      });
    }
  };

  // 아이콘 버전
  if (variant === "icon") {
    return (
      <button
        onClick={handleToggleFavorite}
        className={`
          p-2 rounded-full transition-all duration-200
          hover:scale-110
          ${
            isAlreadyFavorite
              ? "text-yellow-500 hover:text-yellow-600"
              : "text-gray-400 hover:text-gray-600"
          }
        `}
        aria-label={isAlreadyFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      >
        <span className="text-3xl">{isAlreadyFavorite ? "⭐" : "☆"}</span>
      </button>
    );
  }

  // 전체 버전
  return (
    <button
      onClick={handleToggleFavorite}
      className={`
        w-full px-6 py-3 rounded-lg font-medium
        transition-all duration-200
        flex items-center justify-center gap-2
        ${
          isAlreadyFavorite
            ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-md"
            : "bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300"
        }
      `}
    >
      <span className="text-xl">{isAlreadyFavorite ? "⭐" : "☆"}</span>
      <span>{isAlreadyFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}</span>
    </button>
  );
};
