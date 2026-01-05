// lib/sajuLogic.ts

// 오행 데이터 타입 정의
export type ElementType = "wood" | "fire" | "earth" | "metal" | "water";

interface SajuResult {
  element: ElementType; // 부족한 오행 (추천할 기운)
  color: string;        // 추천 컬러
  direction: string;    // 추천 방위
  koreanName: string;   // 오행 한글명
  desc: string;         // 진단 멘트
  items: string[];      // 추천 아이템 키워드
}

export function analyzeSaju(birthDate: string): SajuResult {
  // 1. 생년월일에서 '월(Month)'을 추출
  const date = new Date(birthDate);
  const month = date.getMonth() + 1; // 1월=0 이므로 +1

  // 2. 계절별 부족한 기운 분석 (조후 용신론 단순화)
  // 봄(2,3,4월)생 -> 목(Wood)이 강함 -> 금(Metal) 또는 토(Earth) 필요
  // 여름(5,6,7월)생 -> 화(Fire)가 강함 -> 수(Water) 필요 (시원하게)
  // 가을(8,9,10월)생 -> 금(Metal)이 강함 -> 목(Wood) 또는 화(Fire) 필요
  // 겨울(11,12,1월)생 -> 수(Water)가 강함 -> 화(Fire) 또는 토(Earth) 필요 (따뜻하게)

  if (month >= 2 && month <= 4) {
    return {
      element: "metal",
      koreanName: "금(Metal)",
      color: "화이트, 골드, 메탈릭",
      direction: "서쪽 (West)",
      desc: "봄의 기운이 강해 에너지가 위로 솟구칩니다. 이를 다듬어줄 '금(Metal)'의 기운이 필요해요.",
      items: ["메탈 시계", "원형 거울", "화이트 트레이"],
    };
  } else if (month >= 5 && month <= 7) {
    return {
      element: "water",
      koreanName: "수(Water)",
      color: "블랙, 네이비, 블루",
      direction: "북쪽 (North)",
      desc: "뜨거운 여름의 기운이 강합니다. 열기를 식혀줄 시원한 '수(Water)'의 기운이 절실합니다.",
      items: ["어항/수조", "바다 그림", "검정색 오브제"],
    };
  } else if (month >= 8 && month <= 10) {
    return {
      element: "wood",
      koreanName: "목(Wood)",
      color: "그린, 민트, 우드",
      direction: "동쪽 (East)",
      desc: "가을의 건조하고 날카로운 기운이 강합니다. 생기를 불어넣을 '목(Wood)'의 기운을 보충하세요.",
      items: ["식물(몬스테라)", "라탄 바구니", "숲 포스터"],
    };
  } else {
    // 겨울 (11, 12, 1월)
    return {
      element: "fire",
      koreanName: "화(Fire)",
      color: "레드, 핑크, 오렌지",
      direction: "남쪽 (South)",
      desc: "겨울의 차가운 기운이 몸을 움츠러들게 합니다. 온기를 더해줄 '불(Fire)'의 기운이 필요해요.",
      items: ["무드등/조명", "붉은색 러그", "캔들 워머"],
    };
  }
}