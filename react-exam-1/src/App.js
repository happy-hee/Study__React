// import "./App.css";
import Container from "./Container";
import Counter from "./Counter";
import MyHeader from "./MyHeader";

function App() {
  const counterProps = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
  };

  return (
    <Container>
      <MyHeader />
      <Counter {...counterProps} />
    </Container>
  );
}

// initialValue가 props에 없을 시 기본값
Counter.defaultProps = {
  initialValue: 0,
};

export default App;
