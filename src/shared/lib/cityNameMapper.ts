const SIDO_MAP: Record<string, string> = {
  // 광역시/특별시
  서울특별시: "Seoul",
  부산광역시: "Busan",
  대구광역시: "Daegu",
  인천광역시: "Incheon",
  광주광역시: "Gwangju",
  대전광역시: "Daejeon",
  울산광역시: "Ulsan",
  세종특별자치시: "Sejong",

  // 경기도 (31개)
  "경기도-수원시": "Suwon",
  "경기도-성남시": "Seongnam",
  "경기도-고양시": "Goyang",
  "경기도-용인시": "Yongin",
  "경기도-부천시": "Bucheon",
  "경기도-안산시": "Ansan",
  "경기도-안양시": "Anyang",
  "경기도-남양주시": "Namyangju",
  "경기도-화성시": "Hwaseong",
  "경기도-평택시": "Pyeongtaek",
  "경기도-의정부시": "Uijeongbu",
  "경기도-시흥시": "Siheung",
  "경기도-파주시": "Paju",
  "경기도-김포시": "Gimpo",
  "경기도-광명시": "Gwangmyeong",
  "경기도-광주시": "Gwangju-si",
  "경기도-군포시": "Gunpo",
  "경기도-하남시": "Hanam",
  "경기도-오산시": "Osan",
  "경기도-양주시": "Yangju",
  "경기도-이천시": "Icheon",
  "경기도-구리시": "Guri",
  "경기도-안성시": "Anseong",
  "경기도-포천시": "Pocheon",
  "경기도-의왕시": "Uiwang",
  "경기도-양평군": "Yangpyeong",
  "경기도-여주시": "Yeoju",
  "경기도-동두천시": "Dongducheon",
  "경기도-과천시": "Gwacheon",
  "경기도-가평군": "Gapyeong",
  "경기도-연천군": "Yeoncheon",

  // 강원특별자치도 (18개)
  "강원특별자치도-춘천시": "Chuncheon",
  "강원특별자치도-원주시": "Wonju",
  "강원특별자치도-강릉시": "Gangneung",
  "강원특별자치도-동해시": "Donghae",
  "강원특별자치도-태백시": "Taebaek",
  "강원특별자치도-속초시": "Sokcho",
  "강원특별자치도-삼척시": "Samcheok",
  "강원특별자치도-홍천군": "Hongcheon",
  "강원특별자치도-횡성군": "Hoengseong",
  "강원특별자치도-영월군": "Yeongwol",
  "강원특별자치도-평창군": "Pyeongchang",
  "강원특별자치도-정선군": "Jeongseon",
  "강원특별자치도-철원군": "Cheorwon",
  "강원특별자치도-화천군": "Hwacheon",
  "강원특별자치도-양구군": "Yanggu",
  "강원특별자치도-인제군": "Inje",
  "강원특별자치도-고성군": "Goseong-gangwon",
  "강원특별자치도-양양군": "Yangyang",

  // 충청북도 (11개)
  "충청북도-청주시": "Cheongju",
  "충청북도-충주시": "Chungju",
  "충청북도-제천시": "Jecheon",
  "충청북도-보은군": "Boeun",
  "충청북도-옥천군": "Okcheon",
  "충청북도-영동군": "Yeongdong",
  "충청북도-증평군": "Jeungpyeong",
  "충청북도-진천군": "Jincheon",
  "충청북도-괴산군": "Goesan",
  "충청북도-음성군": "Eumseong",
  "충청북도-단양군": "Danyang",

  // 충청남도 (15개)
  "충청남도-천안시": "Cheonan",
  "충청남도-공주시": "Gongju",
  "충청남도-보령시": "Boryeong",
  "충청남도-아산시": "Asan",
  "충청남도-서산시": "Seosan",
  "충청남도-논산시": "Nonsan",
  "충청남도-계룡시": "Gyeryong",
  "충청남도-당진시": "Dangjin",
  "충청남도-금산군": "Geumsan",
  "충청남도-부여군": "Buyeo",
  "충청남도-서천군": "Seocheon",
  "충청남도-청양군": "Cheongyang",
  "충청남도-홍성군": "Hongseong",
  "충청남도-예산군": "Yesan",
  "충청남도-태안군": "Taean",

  // 전북특별자치도 (14개)
  "전북특별자치도-전주시": "Jeonju",
  "전북특별자치도-군산시": "Gunsan",
  "전북특별자치도-익산시": "Iksan",
  "전북특별자치도-정읍시": "Jeongeup",
  "전북특별자치도-남원시": "Namwon",
  "전북특별자치도-김제시": "Gimje",
  "전북특별자치도-완주군": "Wanju",
  "전북특별자치도-진안군": "Jinan",
  "전북특별자치도-무주군": "Muju",
  "전북특별자치도-장수군": "Jangsu",
  "전북특별자치도-임실군": "Imsil",
  "전북특별자치도-순창군": "Sunchang",
  "전북특별자치도-고창군": "Gochang",
  "전북특별자치도-부안군": "Buan",

  // 전라남도 (22개)
  "전라남도-목포시": "Mokpo",
  "전라남도-여수시": "Yeosu",
  "전라남도-순천시": "Suncheon",
  "전라남도-나주시": "Naju",
  "전라남도-광양시": "Gwangyang",
  "전라남도-담양군": "Damyang",
  "전라남도-곡성군": "Gokseong",
  "전라남도-구례군": "Gurye",
  "전라남도-고흥군": "Goheung",
  "전라남도-보성군": "Boseong",
  "전라남도-화순군": "Hwasun",
  "전라남도-장흥군": "Jangheung",
  "전라남도-강진군": "Gangjin",
  "전라남도-해남군": "Haenam",
  "전라남도-영암군": "Yeongam",
  "전라남도-무안군": "Muan",
  "전라남도-함평군": "Hampyeong",
  "전라남도-영광군": "Yeonggwang",
  "전라남도-장성군": "Jangseong",
  "전라남도-완도군": "Wando",
  "전라남도-진도군": "Jindo",
  "전라남도-신안군": "Sinan",

  // 경상북도 (23개)
  "경상북도-포항시": "Pohang",
  "경상북도-경주시": "Gyeongju",
  "경상북도-김천시": "Gimcheon",
  "경상북도-안동시": "Andong",
  "경상북도-구미시": "Gumi",
  "경상북도-영주시": "Yeongju",
  "경상북도-영천시": "Yeongcheon",
  "경상북도-상주시": "Sangju",
  "경상북도-문경시": "Mungyeong",
  "경상북도-경산시": "Gyeongsan",
  "경상북도-군위군": "Gunwi",
  "경상북도-의성군": "Uiseong",
  "경상북도-청송군": "Cheongsong",
  "경상북도-영양군": "Yeongyang",
  "경상북도-영덕군": "Yeongdeok",
  "경상북도-청도군": "Cheongdo",
  "경상북도-고령군": "Goryeong",
  "경상북도-성주군": "Seongju",
  "경상북도-칠곡군": "Chilgok",
  "경상북도-예천군": "Yecheon",
  "경상북도-봉화군": "Bonghwa",
  "경상북도-울진군": "Uljin",
  "경상북도-울릉군": "Ulleung",

  // 경상남도 (18개)
  "경상남도-창원시": "Changwon",
  "경상남도-진주시": "Jinju",
  "경상남도-통영시": "Tongyeong",
  "경상남도-사천시": "Sacheon",
  "경상남도-김해시": "Gimhae",
  "경상남도-밀양시": "Miryang",
  "경상남도-거제시": "Geoje",
  "경상남도-양산시": "Yangsan",
  "경상남도-의령군": "Uiryeong",
  "경상남도-함안군": "Haman",
  "경상남도-창녕군": "Changnyeong",
  "경상남도-고성군": "Goseong-gyeongnam",
  "경상남도-남해군": "Namhae",
  "경상남도-하동군": "Hadong",
  "경상남도-산청군": "Sancheong",
  "경상남도-함양군": "Hamyang",
  "경상남도-거창군": "Geochang",
  "경상남도-합천군": "Hapcheon",

  // 제주특별자치도 (2개)
  "제주특별자치도-제주시": "Jeju",
  "제주특별자치도-서귀포시": "Seogwipo",
};

export const convertToEnglishCity = (koreanLocation: string): string => {
  const parts = koreanLocation.split("-");

  // 1단계: 광역시/특별시 체크
  const sido = parts[0];
  if (sido.includes("특별시") || sido.includes("광역시")) {
    return SIDO_MAP[sido] || sido;
  }

  // 2단계: "시도-시군" 조합으로 매핑 확인 (예: "경기도-수원시")
  if (parts.length >= 2) {
    const sidoSigungu = `${parts[0]}-${parts[1]}`;

    // "청주시청원구" → "청주시"로 정리
    const cleanedSigungu = parts[1]
      .replace(/시.+구$/, "시")
      .replace(/군.+면$/, "군");

    const cleanedKey = `${parts[0]}-${cleanedSigungu}`;

    // 매핑 테이블에서 찾기
    if (SIDO_MAP[sidoSigungu]) {
      return SIDO_MAP[sidoSigungu];
    }
    if (SIDO_MAP[cleanedKey]) {
      return SIDO_MAP[cleanedKey];
    }
  }

  // 3단계: fallback - 시도명만 반환
  return SIDO_MAP[sido] || sido;
};
