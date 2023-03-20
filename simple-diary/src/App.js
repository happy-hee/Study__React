import "./App.css";
import { useState, useRef } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";

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

  // 일기 삭제
  const onRemove = (targetId) => {
    // filter : 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  // 일기 데이터 수정
  const onEdit = (targetId, newContent) => {
    setData(
      // 원본 데이터의 모든 요소를 순회하며 새로운 배열을 만들어 setData 에 전달
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
