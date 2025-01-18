import React, { useState } from "react";
import TestBuilder from "./components/quiz/test-builder/TestBuilder";
import BuildedTest from "./components/quiz/builded-test/BuildedTest";

const App = () => {
  const [quizData, setQuizData] = useState(null); // Holds saved quiz data

  const handleSaveQuiz = (questions) => {
    setQuizData(questions); // Save the quiz data
  };

  return (
    <div className="app">
      {quizData ? (
        <BuildedTest questions={quizData} />
      ) : (
        <TestBuilder onSaveQuiz={handleSaveQuiz} />
      )}
    </div>
  );
};

export default App;
