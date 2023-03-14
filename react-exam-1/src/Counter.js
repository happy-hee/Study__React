import React, { useState } from "react";
import OddEvenResult from "./OddEvenResult";

const Counter = ({ initialValue }) => {
  // count: 상태의 값
  // setCount: 상태를 변화(업데이트)
  // useState(): 초기값

  // 리액트의 컴포넌트가 리랜더링이 되는 경우
  // 1. 컴포넌트 본인이 관리하고 본인이 가진 State가 바뀔 때
  // 2. 나에게 내려오는 props가 바뀔 때
  // 3. 내 부모가 리렌더가 되는 경우

  const [count, setCount] = useState(initialValue);

  const onIncrease = () => {
    setCount(count + 1);
  };

  const onDecrease = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={onIncrease}>+</button>
      <button onClick={onDecrease}>-</button>
      <OddEvenResult count={count} />
    </div>
  );
};

export default Counter;
