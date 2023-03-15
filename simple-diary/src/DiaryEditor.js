import { useState } from "react";

const DiaryEditor = () => {
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      //[]괄호 표기법으로 객체에 key를 부여함
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(state);
    alert("저장 성공!");
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          value={state.author}
          // onChange={(e) => {
          //   setState({
          //     //스프레드 연산자로 '원래의 값'을 할당
          //     //!!이 경우 무조건 제일 위에 작성!!
          //     //아래에 작성하면 안되는 이유 :
          //     //아래에 작성하면 원래의 값으로 덮어씌워지기 때문
          //     ...state,
          //     author: e.target.value,
          //   });
          // }}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};
export default DiaryEditor;
