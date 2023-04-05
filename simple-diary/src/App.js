import "./App.css";
import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  //일기 데이터
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  // 새로운 일기 추가
  // useCallback : 함수의 재생성
  const onCreate = useCallback(
    (author, content, emotion) => {
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

      // 항상 최신의 state를 참조 :useCallback을 사용하면서 setData를 함수형 업데이트로 변경
      setData((data) => [newItem, ...data]);
    },

    []
  );

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

  // useMemo(콜백함수,[defendency array])
  const getDiaryAnalysis = useMemo(
    () => {
      // 기분이 좋은 일기 갯수
      const goodCount = data.filter((it) => it.emotion >= 3).length;
      // 기분이 안좋은 일기 갯수
      const badCount = data.length - goodCount;
      // 기분이 좋은 일기 배율
      const goodRatio = (goodCount / data.length) * 100;
      return { goodCount, badCount, goodRatio };
    },
    [data.length] //data.length 값이 변화할 때만 연산을 다시 수행
  );

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 배율 : {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
