import React, { useState, useEffect } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`counterA uptate - count : ${count}`);
  });

  return <div>{count}</div>;
});

// CounterB 는 객체를 받아오므로 React.memo 사용시 무조건 실행이 됨
// (얕은비교로 인해 같은 값을 가졌더라도 객체는 항상 다르기 때문)
// 그러므로 아래의 areEqual 함수를 사용해야한다.
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`counterB uptate - count : ${obj.count}`);
  });

  return <div>{obj.count}</div>;
};

// props들을 비교하여 boolean 값 반환
const areEqual = (prevProps, nextProps) => {
  if (prevProps.obj.count === nextProps.obj.count) {
    return true; //이전 프롭스, 현재 프롭스가 같다 -> 리렌더링을 일으키지 않음
  }
  return false; //이전과 현재가 다르다 -> 리렌더링을 일으킴
};

// CounterB는 areEqual의 판단에 따라서 실행을 할지 말지 판단
const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);

  const [obj, setObj] = useState({
    count: 1,
  });

  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />
        <button onClick={() => setObj({ count: obj.count })}>B button</button>
      </div>
    </div>
  );
};

export default OptimizeTest;

/**
 *  React.memo 사용해보기
 */
// import React, { useState, useEffect } from "react";

// const TextView = React.memo(({ text }) => {
//   useEffect(() => {
//     console.log(`update :: text : ${text} `);
//   });
//   return <div>{text}</div>;
// });

// const CountView = React.memo(({ count }) => {
//   useEffect(() => {
//     console.log(`update :: count : ${count} `);
//   });
//   return <div>{count}</div>;
// });

// const OptimizeTest = () => {
//   const [count, setCount] = useState(1);
//   const [text, setText] = useState("");

//   return (
//     <div style={{ padding: 50 }}>
//       <div>
//         <h2>Count</h2>
//         <CountView count={count} />
//         <button onClick={() => setCount(count + 1)}>+</button>
//       </div>
//       <div>
//         <h2>Text</h2>
//         <TextView text={text} />
//         <input value={text} onChange={(e) => setText(e.target.value)} />
//       </div>
//     </div>
//   );
// };

// export default OptimizeTest;
