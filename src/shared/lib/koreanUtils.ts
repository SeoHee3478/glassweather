/**
 * 한글 초성 검색을 위한 유틸리티 함수들
 */

// 초성 배열
const CHOSUNG = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;

/**
 * 한글 문자열에서 초성만 추출
 * @param str - 한글 문자열
 * @returns 초성 문자열 (예: "서울" → "ㅅㅇ")
 *
 * @example
 * getChosung("서울") // "ㅅㅇ"
 * getChosung("종로구") // "ㅈㄹㄱ"
 */
export const getChosung = (str: string): string => {
  return str
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0) - 44032;
      if (code < 0 || code > 11171) return char;
      return CHOSUNG[Math.floor(code / 588)];
    })
    .join("");
};

/**
 * 문자열이 초성만으로 이루어져 있는지 확인
 * @param str - 검사할 문자열
 * @returns 초성만 있으면 true
 *
 * @example
 * isChosungOnly("ㅅㅇ") // true
 * isChosungOnly("서울") // false
 * isChosungOnly("ㄱㅇ123") // false
 */
export const isChosungOnly = (str: string): boolean => {
  return /^[ㄱ-ㅎ]+$/.test(str);
};

/**
 * 한글 문자열이 특정 초성 패턴을 포함하는지 확인
 * @param text - 검사할 한글 문자열
 * @param chosungPattern - 초성 패턴 (예: "ㅅㅇ")
 * @returns 포함하면 true
 *
 * @example
 * matchChosung("서울특별시", "ㅅㅇ") // true
 * matchChosung("부산광역시", "ㅅㅇ") // false
 */
export const matchChosung = (text: string, chosungPattern: string): boolean => {
  return getChosung(text).includes(chosungPattern);
};
