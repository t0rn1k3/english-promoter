import "./App.css";
import MainPage from "./components/main -page/MainPage";
import Slider from "./components/quiz/slider/Slider";
import TestBuilder from "./components/quiz/test-builder/TestBuilder";

function App() {
  const questions = [
    { id: 1, question: "What is the capital of France?" },
    { id: 2, question: "What is 2 + 2?" },
    { id: 3, question: "Who wrote 'Hamlet'?" },
  ];
  return (
    <div className="App">
      {/* <MainPage /> */}
      {/* <Slider questions={questions} /> */}
      <TestBuilder />
    </div>
  );
}

export default App;
