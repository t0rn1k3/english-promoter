import React, { createContext, useState } from "react";

export const TestContext = createContext();

export const TestProvider = ({ children }) => {
  const [taskExplanation, setTaskExplanation] = useState("");
  const [questionsList, setQuestionsList] = useState([]);

  return (
    <TestContext.Provider
      value={{
        taskExplanation,
        setTaskExplanation,
        questionsList,
        setQuestionsList,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
