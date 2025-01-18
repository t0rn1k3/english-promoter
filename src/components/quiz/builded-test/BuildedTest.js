import React from "react";
import { useLocation } from "react-router-dom";

const BuildedTest = () => {
  const location = useLocation();
  const { questionsList } = location.state || { questionsList: [] };

  return (
    <div className="builded-test">
      <h2>Builded Test</h2>
      {questionsList.map((q) => (
        <div key={q.id} className="question-item">
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
