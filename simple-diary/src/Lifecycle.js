import React, { useEffect, useState } from "react";

/**
 * unmount 사용해보기
 */
const UnmountTest = () => {
  useEffect(() => {
    console.log("Mount!");

    // return 되는 함수는 Unmount 시점에 실행됨
    return () => {
      console.log("Unmount!");
    };
  }, []);
  return <div>Unmount Testing Component</div>;
};

const Lifecycle = () => {
  /**
   * useEffect 사용해보기
   */
  // const [count, setCount] = useState(0);
  // const [text, setText] = useState("");

  // useEffect(() => {
  //   //mount
  //   console.log("mount");
  // }, []);

  // // 모든것이 변경되는 시점마다 콜백함수 실행
  // useEffect(() => {
  //   console.log("Update");
  // });

  // // count가 변경되는 시점마다 콜백함수 실행
  // useEffect(() => {
  //   console.log(`count is update : ${count}`);
  //   if (count > 5) {
  //     alert("count가 5를 넘었습니다. 따라서 1로 초기화 합니다.");
  //     setCount(1);
  //   }
  // }, [count]);

  // // text가 변경되는 시점마다 콜백함수 실행
  // useEffect(() => {
  //   console.log(`text is update : ${text}`);
  // }, [text]);

  /**
   * unmount 사용해보기
   */
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return (
    <>
      {/* <div style={{ padding: 20, display: "none" }}>
        <div>
          {count}
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
        <div>
          <input value={text} onChange={(e) => setText(e.target.value)} />
        </div>
      </div> */}

      <div style={{ padding: 20 }}>
        <button onClick={toggle}>ON / OFF</button>
        {/* isVisible 이 true 일때만 UnmountTest 반환 */}
        {isVisible && <UnmountTest />}
      </div>
    </>
  );
};

export default Lifecycle;
