import { getChosung, isChosungOnly } from "./koreanUtils";

/**
 * 검색어 정규화
 */
const normalizeSearchTerm = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/특별시|광역시|특별자치시|특별자치도/g, "")
    .replace(/[도시군구읍면동리]/g, "");
};

/**
 * 지역명 정규화
 */
const normalizeDistrict = (district: string): string => {
  return district
    .toLowerCase()
    .replace(/-/g, "")
    .replace(/특별시|광역시|특별자치시|특별자치도/g, "")
    .replace(/[도시군구읍면동리]/g, "");
};

/**
 * 정확도 점수 계산
 */
const calculateRelevance = (district: string, query: string): number => {
  const parts = district.split("-");
  const normalizedQuery = normalizeSearchTerm(query);
  let score = 0;

  // 1. 원본 정확 일치 (최고 점수)
  if (parts.some((p) => p.toLowerCase() === query.toLowerCase().trim())) {
    score += 120;
  }

  // 2. 정규화 후 정확 일치
  if (parts.some((p) => normalizeSearchTerm(p) === normalizedQuery)) {
    score += 100;
  }

  // 3. 시작 일치
  if (parts.some((p) => normalizeSearchTerm(p).startsWith(normalizedQuery))) {
    score += 80;
  }

  // 4. 레벨별 가중치
  parts.forEach((part, index) => {
    if (normalizeSearchTerm(part).includes(normalizedQuery)) {
      if (index === 0) score += 50;
      if (index === 1) score += 40;
      if (index === 2) score += 30;
    }
  });

  // 5. 짧은 주소 우선
  score -= parts.length * 2;

  // 6. 검색어 길이 비율
  const matchRatio =
    normalizedQuery.length / normalizeDistrict(district).length;
  score += matchRatio * 20;

  return score;
};

/**
 * 지역 검색
 */
export const searchDistricts = (
  districts: string[],
  query: string
): string[] => {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) return [];

  let results: string[];

  if (isChosungOnly(normalizedQuery)) {
    // 초성 검색
    results = districts.filter((d) => getChosung(d).includes(normalizedQuery));
  } else {
    // 정규화 검색 (간소화)
    const normalizedSearch = normalizeSearchTerm(normalizedQuery);
    results = districts.filter((d) =>
      normalizeDistrict(d).includes(normalizedSearch)
    );
  }

  // 정확도 점수로 정렬
  return results
    .map((d) => ({
      district: d,
      score: calculateRelevance(d, normalizedQuery),
    }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.district);
};
