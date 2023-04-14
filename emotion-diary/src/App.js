import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// SPA 방식으로 페이지를 이동 시켜주는 컴포넌트(Link)
// import RouteTest from "./components/RouteTest";

//페이지 역할 임포트
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

// compononts
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"App"}
          leftChild={
            <MyButton text="왼쪽버튼" onClick={() => alert("왼쪽클릭")} />
          }
          rightChild={
            <MyButton text="오른쪽버튼" onClick={() => alert("오른쪽클릭")} />
          }></MyHeader>
        <h2>App.js</h2>

        <MyButton
          text={"버튼"}
          onClick={() => {
            alert("버튼 클릭!!");
          }}
          type={"positive"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => {
            alert("버튼 클릭!!");
          }}
          type={"negative"}
        />
        <MyButton
          text={"버튼"}
          onClick={() => {
            alert("버튼 클릭!!");
          }}
          type={"default"}
        />
        <Routes>
          {/* Route : url 경로와 컴포넌트를 mapping 시켜주는 컴포넌트 */}
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          {/* path 경로 뒤에 콜론을 사용해서 뒤에있는 값을 전달하겠다고 선언 */}
          <Route path="/diary:id" element={<Diary />} />
        </Routes>
        {/* React Route는 별도의 컴포넌트를 이용해서 페이지 이동 (예시 : <RouteTest />) */}
        {/* <RouteTest /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
