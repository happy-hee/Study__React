import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();
  // useNavigate()
  // 페이지를 이동시킬 수 있는 기능을 하는 함수를 한개 반환해줌 -> 인자로 경로를 작성하면 해당 경로로 옮겨준다. - 클릭하지 않아도 의도적으로 페이지를 이동시킬 수 있다.
  const navigate = useNavigate();
  const { id } = useParams();
  // 다이어리 리스트
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      // 없는 id(글번호)로 접속하는 경우
      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        // 홈화면으로 이동
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  // useSearchParams()
  // searchParams : 내가 주소창에 입력한 name의 value값을 불러옴
  // setSearchParams: 내가 주소창의 쿼리 스트링을 변경함
  // const [searchParams, setSearchParams] = useSearchParams();
  // const id = searchParams.get("id");
  // const mode = searchParams.get("mode");

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
