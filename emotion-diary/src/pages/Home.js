import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);

  //현재 날짜
  const [curDate, setCurDate] = useState(new Date());

  const headText = `${curDate.getFullYear()} 년 ${curDate.getMonth() + 1} 월`; //getMonth 사용시 월이 0부터 시작하므로 + 1을 해준다.

  // 웹사이트 타이틀 변경
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);

  // curDate가 변화하는 순간에만 다이어리에서 연도/월에 해당하는 일기 데이터만 뽑아옴
  useEffect(() => {
    if (diaryList.length >= 1) {
      // 현재 날짜의 연, 월, 첫 날
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      // 마지막 날
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        // 시간을 비교할 땐 시.분.초 전부 영향을 미침
        23,
        59,
        59
      ).getTime();

      setData(
        // 처음날이 리스트의 날짜보다 크거나 같고, 마지막날이 작거나 같은 경우
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

  // 한달씩 증가
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  // 한달씩 감소
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
