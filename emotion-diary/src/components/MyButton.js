const MyButton = ({ text, type, onClick }) => {
  //type 으로 전달되는 글자가 배열 안에 있는 타입이 아니라면, 강제로 default 타입으로 전달
  const btnType = ["positive", "negative"].includes(type) ? type : "default";

  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}>
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
