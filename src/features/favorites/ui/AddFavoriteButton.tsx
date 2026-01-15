import { useFavoritesStore } from "../model/useFavoritesStore";
import type { WeatherResponse } from "@/entities/weather/model/types";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { toast } from "sonner";

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

  const maxFavorites = useFavoritesStore((state) => state.maxFavorites);

  const handleToggleFavorite = () => {
    if (isAlreadyFavorite) {
      removeFavorite(favoriteId);
      toast.success("즐겨찾기에서 삭제되었습니다");
    } else {
      const result = addFavorite({
        id: favoriteId,
        name: locationName,
        alias: "",
        lat: weather.coord.lat,
        lon: weather.coord.lon,
      });

      if (result.success) {
        toast.success("즐겨찾기에 추가되었습니다");
      } else if (result.reason === "max_reached") {
        toast.error(`최대 ${maxFavorites}개까지만 추가할 수 있습니다`);
      } else if (result.reason === "duplicate") {
        toast.error("이미 즐겨찾기에 추가된 장소입니다");
      }
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
        <span className="text-3xl">
          {isAlreadyFavorite ? (
            <StarSolid className="w-6 h-6 text-yellow-400" />
          ) : (
            <StarIcon className="w-6 h-6" />
          )}
        </span>
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
      <span className="text-xl">
        {isAlreadyFavorite ? (
          <StarSolid className="w-6 h-6 text-yellow-400" />
        ) : (
          <StarIcon className="w-6 h-6" />
        )}
      </span>
      <span>{isAlreadyFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}</span>
    </button>
  );
};
