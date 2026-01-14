import { getChosung, isChosungOnly } from "./koreanUtils";

/**
 * 지역 검색 로직
 * @param districts - 전체 지역 배열
 * @param query - 검색어
 * @returns 매칭된 지역 배열
 */
export const searchDistricts = (
  districts: string[],
  query: string
): string[] => {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  if (isChosungOnly(normalizedQuery)) {
    // 초성 검색
    return districts.filter((district) =>
      getChosung(district).includes(normalizedQuery)
    );
  }

  // 일반 검색 (띄어쓰기 → 하이픈 변환)
  const searchTerm = normalizedQuery.replace(/\s+/g, "-");
  return districts.filter((district) =>
    district.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
