import { CITY_COORDINATES } from "@/shared/data/cityCoordinates";

/**
 * 지명에서 "-"를 공백으로 변환하여 표시용 문자열로 변환
 * @example "충청남도-천안시" → "충청남도 천안시"
 */
export const formatLocationName = (name: string) => name.replace(/-/g, " ");

export const getCityCoordinates = (koreanLocation: string) => {
  const parts = koreanLocation.split("-");

  // 1단계: "시도-시군" 조합으로 먼저 찾기 (예: "강원특별자치도-고성군")
  if (parts.length >= 2) {
    const sidoSigungu = `${parts[0]}-${parts[1]}`;
    if (CITY_COORDINATES[sidoSigungu]) {
      return CITY_COORDINATES[sidoSigungu];
    }

    // "청주시청원구" → "청주시" 정리
    const cleanCity = parts[1]
      .replace(/시.+구$/, "시")
      .replace(/군.+면$/, "군");

    const cleanedKey = `${parts[0]}-${cleanCity}`;
    if (CITY_COORDINATES[cleanedKey]) {
      return CITY_COORDINATES[cleanedKey];
    }
  }

  // 2단계: 시군명만으로 찾기 (예: "서울특별시")
  if (parts.length >= 2) {
    const cleanCity = parts[1]
      .replace(/시.+구$/, "시")
      .replace(/군.+면$/, "군");

    if (CITY_COORDINATES[cleanCity]) {
      return CITY_COORDINATES[cleanCity];
    }
  }

  // 3단계: 시도명으로 찾기
  const sido = parts[0];
  return CITY_COORDINATES[sido] || null;
};
