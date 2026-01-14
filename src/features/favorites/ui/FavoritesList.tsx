import { useFavoritesStore } from "../model/useFavoritesStore";
import { FavoriteCard } from "./FavoriteCard";

export const FavoritesList = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const maxFavorites = useFavoritesStore((state) => state.maxFavorites);

  if (favorites.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">즐겨찾기</h2>
        <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <p className="text-gray-500">아직 즐겨찾기한 장소가 없습니다.</p>
          <p className="text-sm text-gray-400 mt-2">
            장소를 검색하고 ⭐ 버튼을 눌러 즐겨찾기에 추가해보세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">즐겨찾기</h2>
        <span className="text-sm text-gray-500">
          {favorites.length} / {maxFavorites}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((favorite) => (
          <FavoriteCard key={favorite.id} favorite={favorite} />
        ))}
      </div>
    </div>
  );
};
