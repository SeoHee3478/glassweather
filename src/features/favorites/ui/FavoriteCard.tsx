// app/features/favorites/ui/FavoriteCard.tsx
import { useNavigate } from "react-router-dom";
import { useWeatherByCoords } from "@/entities/weather/model/queries";
import { useState } from "react";
import { useFavoritesStore, type Favorite } from "../model/useFavoritesStore";

interface FavoriteCardProps {
  favorite: Favorite;
}

export const FavoriteCard = ({ favorite }: FavoriteCardProps) => {
  const navigate = useNavigate();
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const updateAlias = useFavoritesStore((state) => state.updateAlias);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(favorite.alias || favorite.name);

  // 즐겨찾기 장소의 날씨 조회
  const { data: weather, isLoading } = useWeatherByCoords(
    favorite.lat,
    favorite.lon
  );

  const handleCardClick = () => {
    // 편집 중이 아닐 때만 상세 페이지로 이동
    if (!isEditing) {
      navigate(`/detail/${favorite.lat},${favorite.lon}`);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (
      confirm(`"${favorite.alias || favorite.name}"을(를) 삭제하시겠습니까?`)
    ) {
      removeFavorite(favorite.id);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveAlias = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateAlias(favorite.id, editValue);
    setIsEditing(false);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditValue(favorite.alias || favorite.name);
    setIsEditing(false);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        p-4 border-2 border-gray-200 rounded-lg bg-white 
        transition-all relative
        ${isEditing ? "" : "hover:shadow-lg cursor-pointer"}
      `}
    >
      {/* 헤더: 편집/삭제 버튼 항상 표시 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                placeholder="별칭 입력"
              />
            </div>
          ) : (
            <div>
              <h3 className="font-semibold text-lg truncate">
                {favorite.alias || favorite.name}
              </h3>
              {favorite.alias && (
                <p className="text-xs text-gray-500 truncate">
                  {favorite.name}
                </p>
              )}
            </div>
          )}
        </div>

        {/* 버튼 그룹: 항상 표시 */}
        <div className="flex items-center gap-1 ml-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveAlias}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                title="저장"
              >
                ✓
              </button>
              <button
                onClick={handleCancelEdit}
                className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
                title="취소"
              >
                ✕
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditClick}
                className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="이름 수정"
              >
                ✏️
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="삭제"
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>

      {/* 날씨 정보 */}
      <div className={isEditing ? "pointer-events-none opacity-50" : ""}>
        {isLoading ? (
          <div className="text-sm text-gray-500">로딩 중...</div>
        ) : weather ? (
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold">
                {Math.round(weather.main.temp)}°C
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              최저 {Math.round(weather.main.temp_min)}° / 최고{" "}
              {Math.round(weather.main.temp_max)}°
            </div>
          </div>
        ) : (
          <div className="text-sm text-red-500">
            날씨 정보를 불러올 수 없습니다
          </div>
        )}
      </div>
    </div>
  );
};
