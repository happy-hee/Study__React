import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// SPA 방식으로 페이지를 이동 시켜주는 컴포넌트(Link)
// import RouteTest from "./components/RouteTest";

//페이지 역할 임포트
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import React, { useReducer, useRef } from "react";

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
  return newState;
};

export const DiaryStateContext = React.createContext();
// dispatch 함수들(onCreate, onRemove, onEdit)도 context를 생성해서 공급
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1",
    date: 1681714595421,
  },
  {
    id: 2,
    emotion: 5,
    content: "오늘의 일기 2",
    date: 1681714595426,
  },
  {
    id: 3,
    emotion: 2,
    content: "오늘의 일기 3",
    date: 1681714595436,
  },
  {
    id: 4,
    emotion: 3,
    content: "오늘의 일기 4",
    date: 1681714595446,
  },
  {
    id: 5,
    emotion: 4,
    content: "오늘의 일기 5",
    date: 1681714595450,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);

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
