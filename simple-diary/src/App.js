import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "happy1",
    content: "내용1",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "happy2",
    content: "내용2",
    emotion: 3,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "happy3",
    content: "내용3",
    emotion: 2,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
