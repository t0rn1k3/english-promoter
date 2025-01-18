import React from "react";
import { useLocation } from "react-router-dom";
import "./BuildedTest.css";

const BuildedTest = () => {
  const location = useLocation();
  const { taskExplanation, questionsList } = location.state || {
    taskExplanation: "",
    questionsList: [],
  };

  return (
    <div className="builded-test">
      <div className="builded-h2">
        <h2>ინგლისური ენა</h2>
        <p>იმიტირებული ტესტირება</p>
      </div>
      <div>
        <p>{taskExplanation}</p>
      </div>
      {questionsList.map((q) => (
        <div key={q.id} className="question-item non-copyable">
          <p>
            <strong>
              {q.id}. {q.question}
            </strong>
          </p>
          <ul>
            {q.options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BuildedTest;
