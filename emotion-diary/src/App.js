import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// SPA 방식으로 페이지를 이동 시켜주는 컴포넌트(Link)
// import RouteTest from "./components/RouteTest";

//페이지 역할 임포트
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import React, { useEffect, useReducer, useRef } from "react";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
// dispatch 함수들(onCreate, onRemove, onEdit)도 context를 생성해서 공급
export const DiaryDispatchContext = React.createContext();

function App() {
  // useEffect(() => {
  //   //스토리지에 추가 (setItem)
  //   localStorage.setItem("item1", 10);
  //   localStorage.setItem("item2", "20");
  //   // 객체 저장시 JSON.stringify 사용
  //   localStorage.setItem("item3", JSON.stringify({ value: 30 }));

  //   // 스토리지에서 불러오기 (getItem)
  //   // 기존 값이 숫자였을 경우는 불러올때 parseInt 사용
  //   const item1 = parseInt(localStorage.getItem("item1")); //10
  //   const item2 = localStorage.getItem("item2"); //"20"
  //   // 객체를 불러올때 JSON.parse 사용
  //   const item3 = JSON.parse(localStorage.getItem("item3")); //{ value: 30 }
  //   console.log({ item1, item2, item3 });
  // }, []);

  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    // localStorage 에서 key가 diary인 데이터 불러오기
    const localData = localStorage.getItem("diary");
    // localData가 있을 경우만
    if (localData) {
      //diaryList를 내림차순으로 정렬
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      // 가장 최근 id 값 부분에 diaryList의 0번째의 id값 + 1을 한 값을 부여한다.
      dataId.current = parseInt(diaryList[0].id) + 1;

      //dispatch를 통해 data 상태 변화
      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  const dataId = useRef(6);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              {/* Route : url 경로와 컴포넌트를 mapping 시켜주는 컴포넌트 */}
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              {/* path 경로 뒤에 콜론을 사용해서 뒤에있는 값을 전달하겠다고 선언 */}
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
            {/* React Route는 별도의 컴포넌트를 이용해서 페이지 이동 (예시 : <RouteTest />) */}
            {/* <RouteTest /> */}
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
