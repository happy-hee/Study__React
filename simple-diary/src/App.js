import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import { useState, useRef } from "react";

function App() {
  //일기 데이터
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  // 새로운 일기 추가
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    // id 값이 다르게 하기위해 id 값에 +1씩 추가
    dataId.current += 1;
    // 새 아이템, ...원래 있던 데이터들
    // -> 가장 위에 갈 수 있도록 newItem을 앞에 추가
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    // filter : 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onDelete={onDelete} diaryList={data} />
    </div>
  );
}

export default App;
