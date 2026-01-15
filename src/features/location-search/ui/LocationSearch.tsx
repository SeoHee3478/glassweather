import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import koreaDistricts from "@/shared/data/korea_districts.json";
import { searchDistricts } from "@/shared/lib/searchUtils";
import { formatLocationName } from "@/shared/lib/locationUtils";
import debounce from "lodash/debounce";

interface LocationSearchProps {
  onSelectLocation: (location: string) => void;
}

const ITEMS_PER_PAGE = 10; // 한 번에 보여줄 개수

export const LocationSearch = ({ onSelectLocation }: LocationSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE); // 보여줄 개수
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 디바운싱된 검색 함수 (300ms 지연)
  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (query.trim() === "") {
          setSearchResults([]);
          setIsOpen(false);
          return;
        }
        // 검색어로 필터링
        const results = searchDistricts(koreaDistricts, query);

        setSearchResults(results);
        setDisplayCount(ITEMS_PER_PAGE); // 검색할 때마다 초기화
        setIsOpen(true);
      }, 300),
    []
  );

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      debouncedSearch(query);
    },
    [debouncedSearch]
  );

  const handleSelectLocation = (location: string) => {
    setSearchQuery(formatLocationName(location));
    setIsOpen(false);
    onSelectLocation(location); // 원본 데이터는 그대로 전달
  };

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;

    // 스크롤이 하단 근처에 도달하면 (80% 지점)
    if (scrollHeight - scrollTop <= clientHeight * 1.2) {
      setDisplayCount((prev) => {
        const next = prev + ITEMS_PER_PAGE;
        return next > searchResults.length ? searchResults.length : next;
      });
    }
  }, [searchResults.length]);

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  // 보여줄 결과 (전체 중 displayCount만큼)
  const displayedResults = searchResults.slice(0, displayCount);
  const hasMore = displayCount < searchResults.length;

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
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto"
        >
          {/* 결과 개수 표시 */}
          <div className="sticky top-0 bg-gray-50 px-4 py-2 text-sm text-gray-600 border-b">
            검색 결과: {searchResults.length}개
            {displayCount < searchResults.length &&
              ` (${displayCount}개 표시 중)`}
          </div>

          {displayedResults.map((location, index) => (
            <button
              key={index}
              onClick={() => handleSelectLocation(location)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 transition-colors border-b last:border-b-0"
            >
              {formatLocationName(location)}
            </button>
          ))}

          {/* 로딩 인디케이터 */}
          {hasMore && (
            <div className="px-4 py-3 text-center text-sm text-gray-500">
              스크롤하여 더보기...
            </div>
          )}
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
