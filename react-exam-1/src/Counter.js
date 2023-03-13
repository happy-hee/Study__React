import React, { useState } from "react";

const Counter = () => {
  // 0에서 출발
  // 1씩 증가
  // 1씩 감소
  // count: 상태의 값
  // setCount: 상태를 변화(업데이트)
  // useState(): 초기값

  console.log("counter 호출!");

  const [count, setCount] = useState(0);

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
    </div>
  );
};

export default Counter;
