import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

// 옵션 리스트 (최신순/오래된순)
const sortOptionList = [
  { value: "lasest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

// 옵션 리스트 (감정별)
const filterOptionList = [
  { value: "all", name: "전부 다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

// DOM 에 뿌릴 셀렉트박스
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

// 다이어리 리스트 가공
const DiaryList = ({ diaryList }) => {
  // 페이지 이동이 가능하도록 navigate 변수에 담기
  const navigate = useNavigate();
  // 최신순/오래된순
  const [sortType, setSortType] = useState("lastest");
  // 감정 필터링
  const [filter, setFilter] = useState("all");

  // 정렬 리스트
  const getProcessedDiaryList = () => {
    // 감정별 필터
    const filterCallBack = (item) => {
      // 감정이 good 인 경우
      if (filter === "good") {
        // 감정 점수가 3점 이상인 아이템만 리턴
        return parseInt(item.emotion) >= 3;
      } else {
        // 감정 점수가 3점 미만인 아이템만 리턴
        return parseInt(item.emotion) < 3;
      }
    };

    // 최신순/오래된순 비교
    const compare = (a, b) => {
      // 최신순일 경우
      if (sortType === "lasest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 감정점수가 전체일 경우 ? 다이어리 리스트 그대로 출력 : filterCallBack를 통해 감정점수별로 출력
    const filterdList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
    // 날짜 비교를 통해 최신순/오래된순별로 필터
    const sortedList = filterdList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          {/* 최신순/오래된순 선택 */}
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          {/* 감정별 선택 */}
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기 쓰기"}
            onClick={() => navigate("./new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>
          [내용] {it.content} | [감정점수] : {it.emotion}
        </div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
