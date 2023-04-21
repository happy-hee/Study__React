// 날짜를 YYYY-MM-DD 형식으로 반환
// (달력 날짜와 같은 형식으로 출력하기 위해)
export const getStringDate = (date) => {
  // toISOString : ISO 형식의 문자열을 반환 - YYYY-MM-DDTH어쩌구 형식으로 반환
  // slice 사용해서 YYYY-MM-DD로 나올 수 있도록 한다.
  return date.toISOString().slice(0, 10);
};
