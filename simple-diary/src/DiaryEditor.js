// useRef: HTML DOM 요소에 접근
import { useRef, useState } from "react";

const DiaryEditor = ({ onCreate }) => {
  // ref 객체에 접근
  const authorInput = useRef();
  const contentInput = useRef();

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

  //일기 저장
  const handleSubmit = () => {
    if (state.author.length < 1) {
      // focus
      // current: 현재 가리키는 값
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      // focus
      contentInput.current.focus();
      return;
    }

    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공!");
    // 일기 작성폼 초기화
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          // 선택하고싶은 DOM에 ref 값으로 설정
          ref={authorInput}
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
          ref={contentInput}
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
