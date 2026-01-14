import { getChosung, isChosungOnly } from "./koreanUtils";
/**
 * 검색어와 지역명의 관련도 점수 계산
 * 점수가 높을수록 사용자가 원할 가능성이 높음
 */
const calculateRelevance = (district: string, query: string): number => {
  const parts = district.split("-");
  const normalizedQuery = query.trim();
  let score = 0;

  // 1. 정확히 일치하는 부분 (최고 점수)
  if (parts.some((p) => p === normalizedQuery)) {
    score += 100;
  }

  // 2. 시작 부분 일치 (예: "서울" → "서울특별시")
  if (parts.some((p) => p.startsWith(normalizedQuery))) {
    score += 80;
  }

  // 3. 레벨별 가중치
  parts.forEach((part, index) => {
    if (part.includes(normalizedQuery)) {
      // 시/도 > 시/군/구 > 읍/면/동 순으로 가중치
      if (index === 0) score += 50; // 시/도 (서울특별시, 경기도)
      if (index === 1) score += 40; // 시/군/구 (종로구, 수원시)
      if (index === 2) score += 30; // 읍/면/동 (청운동, 역삼동)
    }
  });

  // 4. 마지막 레벨(동/리) 정확 매칭 보너스
  const lastPart = parts[parts.length - 1];
  if (lastPart === normalizedQuery) {
    score += 60;
  }

  // 5. 짧은 주소 우선 (구체적일수록 높은 점수)
  // 예: "종로구" 검색 시 "서울-종로구" > "서울-종로구-청운동"
  score -= parts.length * 2;

  // 6. 검색어 길이 대비 매칭 비율
  const matchRatio = normalizedQuery.length / district.length;
  score += matchRatio * 20;

  return score;
};

/**
 * 지역 검색 (정확도순 정렬 포함)
 */
export const searchDistricts = (
  districts: string[],
  query: string
): string[] => {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  let results: string[];

  if (isChosungOnly(normalizedQuery)) {
    // 초성 검색
    results = districts.filter((district) =>
      getChosung(district).includes(normalizedQuery)
    );
  } else {
    // 일반 검색 (띄어쓰기 처리)
    const searchTerm = normalizedQuery.replace(/\s+/g, "-");
    results = districts.filter((district) =>
      district.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // 관련도 점수로 정렬 후 상위 10개
  return results
    .map((district) => ({
      district,
      score: calculateRelevance(district, normalizedQuery),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((item) => item.district);
};
