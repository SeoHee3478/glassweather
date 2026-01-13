import { useState } from "react";
import koreaDistricts from "@/shared/data/korea_districts.json";

interface LocationSearchProps {
  onSelectLocation: (location: string) => void;
}

export const LocationSearch = ({ onSelectLocation }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    // 검색어로 필터링
    const results = koreaDistricts.filter((district) =>
      district.includes(query)
    );

    setSearchResults(results.slice(0, 10)); // 최대 10개만 표시
    setIsOpen(true);
  };

  const handleSelectLocation = (location: string) => {
    setSearchQuery(location);
    setIsOpen(false);
    onSelectLocation(location);
  };

  return (
    <div className="relative w-full mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="지역을 검색하세요 (예: 서울, 종로구, 청운동)"
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />

      {isOpen && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map((location, index) => (
            <button
              key={index}
              onClick={() => handleSelectLocation(location)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors border-b last:border-b-0"
            >
              {location.replace(/-/g, " > ")}
            </button>
          ))}
        </div>
      )}

      {isOpen && searchResults.length === 0 && searchQuery.trim() !== "" && (
        <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};
