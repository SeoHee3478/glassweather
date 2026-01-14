import { getChosung, isChosungOnly } from "./koreanUtils";

/**
 * 검색어 정규화
 * "서울시", "서울특별시", "서울" 모두 매칭되도록
 */
const normalizeSearchTerm = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/\s+/g, "") // 띄어쓰기 제거
    .replace(/특별시|광역시|특별자치시|특별자치도/g, "")
    .replace(/[도시군구읍면동리]/g, ""); // $ 제거! 모든 위치에서 제거
};

/**
 * 지역명 정규화
 * 데이터를 검색하기 쉬운 형태로 변환
 */
const normalizeDistrict = (district: string): string => {
  return district
    .toLowerCase()
    .replace(/-/g, "") // 하이픈 제거
    .replace(/특별시|광역시|특별자치시|특별자치도/g, "")
    .replace(/[도시군구읍면동리]/g, ""); // $ 제거! 모든 위치에서 제거
};
/**
 * 유연한 검색 매칭
 */
const flexibleMatch = (district: string, query: string): boolean => {
  const normalizedDistrict = normalizeDistrict(district);
  const normalizedQuery = normalizeSearchTerm(query);

  // 1. 정규화된 텍스트 포함 검사
  if (normalizedDistrict.includes(normalizedQuery)) {
    return true;
  }

  // 2. 원본 텍스트 검사 (하이픈 → 공백)
  const districtWithSpace = district.toLowerCase().replace(/-/g, " ");
  const queryLower = query.toLowerCase();

  if (districtWithSpace.includes(queryLower)) {
    return true;
  }

  // 3. 모든 구분자 제거 후 검사
  const districtNoSep = district.toLowerCase().replace(/[-\s]/g, "");
  const queryNoSep = query.toLowerCase().replace(/\s+/g, "");

  if (districtNoSep.includes(queryNoSep)) {
    return true;
  }

  // 4. 부분 매칭 (각 파트별로)
  const parts = district.split("-").map((p) => p.toLowerCase());
  const queryParts = query.split(/[\s-]+/).map((p) => p.toLowerCase());

  // 모든 쿼리 파트가 순서대로 포함되는지 확인
  let partIndex = 0;
  for (const queryPart of queryParts) {
    let found = false;
    for (let i = partIndex; i < parts.length; i++) {
      if (
        parts[i].includes(queryPart) ||
        normalizeSearchTerm(parts[i]).includes(normalizeSearchTerm(queryPart))
      ) {
        partIndex = i + 1;
        found = true;
        break;
      }
    }
    if (!found) return false;
  }

  return queryParts.length > 0;
};

/**
 * 정확도 점수 계산
 */
const calculateRelevance = (district: string, query: string): number => {
  const parts = district.split("-");
  const normalizedQuery = normalizeSearchTerm(query);
  let score = 0;

  // 1. 정확 일치 (정규화 후)
  if (parts.some((p) => normalizeSearchTerm(p) === normalizedQuery)) {
    score += 100;
  }

  // 2. 원본 정확 일치
  if (parts.some((p) => p.toLowerCase() === query.toLowerCase().trim())) {
    score += 120; // 원본 일치가 더 높은 점수
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
  const matchRatio = query.length / district.length;
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
    // 유연한 검색
    results = districts.filter((d) => flexibleMatch(d, normalizedQuery));
  }

  // 관련도 점수로 정렬
  return results
    .map((d) => ({
      district: d,
      score: calculateRelevance(d, normalizedQuery),
    }))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.district);
};
