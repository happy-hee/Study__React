import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  // useNavigate
  // 페이지를 이동시킬 수 있는 기능을 하는 함수를 한개 반환해줌 -> 인자로 경로를 작성하면 해당 경로로 옮겨준다. - 클릭하지 않아도 의도적으로 페이지를 이동시킬 수 있다.
  const navigate = useNavigate();

  // useSearchParams
  // searchParams : 내가 주소창에 입력한 name의 value값을 불러옴
  // setSearchParams: 내가 주소창의 쿼리 스트링을 변경함
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id : " + id);

  const mode = searchParams.get("mode");
  console.log("mode : " + mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정페이지 입니다.</p>
      <button onClick={() => setSearchParams({ who: "winterload" })}>
        QS 바꾸기
      </button>
      <button
        onClick={() => {
          navigate("./home");
        }}>
        Home으로 가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}>
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
