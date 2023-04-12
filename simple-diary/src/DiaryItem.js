import React, { useState, useRef, useEffect } from "react";

const DiaryItem = ({
  //최적화 필요
  onEdit,
  onRemove,
  content,
  //최적화 불필요 (불변)
  id,
  author,
  emotion,
  created_date,
}) => {
  useEffect(() => {
    console.log(`${id}번째 아이템 렌더!`);
  });

  const [isEdit, setIsEdit] = useState(false);
  // isEdit 반전연산(toggle)
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  // 수정폼 state
  const [localContent, setLocalContent] = useState(content);

  const localContentInput = useRef();

  //일기 데이터 삭제
  const handleRemove = () => {
    if (window.confirm(`${id} 번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  // 수정 취소
  const handleQuitEdit = () => {
    setIsEdit(false);
    //수정폼 내용에 기존 content 입력
    setLocalContent(content);
  };

  // 수정 완료
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => {
                setLocalContent(e.target.value);
              }}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          {" "}
          <button onClick={handleQuitEdit}>취소</button>
          <button onClick={handleEdit}>수정완료</button>
        </>
      ) : (
        <>
          {" "}
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
