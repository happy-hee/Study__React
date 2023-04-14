import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// SPA 방식으로 페이지를 이동 시켜주는 컴포넌트(Link)
import RouteTest from "./components/RouteTest";

//페이지 역할 임포트
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>App.js</h2>
        <Routes>
          {/* Route : url 경로와 컴포넌트를 mapping 시켜주는 컴포넌트 */}
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary" element={<Diary />} />
        </Routes>
        {/* React Route는 별도의 컴포넌트를 이용해서 페이지 이동 (예시 : <RouteTest />) */}
        <RouteTest />
      </div>
    </BrowserRouter>
  );
}

export default App;
