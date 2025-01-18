import React from "react";
import "./BuildedTest.css";

const BuildedTest = ({ questions }) => {
  return (
    <div className="builder-quiz">
      <h2>Your Built Quiz</h2>
      {questions.length === 0 ? (
        <p>No questions created yet.</p>
      ) : (
        questions.map((question) => (
          <div key={question.id} className="quiz-question">
            <p>
              <strong>
                {question.id}. {question.question}
              </strong>
            </p>
            <ul>
              {question.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default BuildedTest;
