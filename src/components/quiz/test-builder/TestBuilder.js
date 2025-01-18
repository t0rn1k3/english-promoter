import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { faTrashCan } from "@fortawesome/duotone-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TestBuilder.css";

const TestBuilder = () => {
  const [taskExplanation, setTaskExplanation] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [questionsList, setQuestionsList] = useState([]);
  const navigate = useNavigate();
  const optionRefs = useRef([]);

  const handleTaskExplanationChange = (e) => {
    setTaskExplanation(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, value, event) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);

    if (event && event.key === "Enter") {
      addOption(index + 1);
    }
  };

  const addOption = (focusIndex = options.length) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions, ""];
      return newOptions;
    });

    setTimeout(() => {
      optionRefs.current[focusIndex]?.focus();
    }, 0);
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    optionRefs.current.splice(index, 1);
  };

  const handleSubmit = () => {
    const newQuestion = {
      id: questionsList.length + 1,
      question,
      options: options.filter((option) => option.trim() !== ""),
    };

    setQuestionsList([...questionsList, newQuestion]);
    setQuestion("");
    setOptions([""]);
    optionRefs.current = [];
  };

  const saveQuizAndNavigate = () => {
    navigate("/test", {
      state: { taskExplanation, questionsList },
    });
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = questionsList
      .filter((q) => q.id !== id)
      .map((q, index) => ({ ...q, id: index + 1 }));
    setQuestionsList(updatedQuestions);
  };

  return (
    <div className="test-maker">
      <h2>Create a New Test</h2>

      <div>
        <label>Task Explanation:</label>
        <input
          type="text"
          value={taskExplanation}
          onChange={handleTaskExplanationChange}
          placeholder="Describe the task or provide instructions"
          rows="3"
        />
      </div>

      <div>
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter your question"
        />
      </div>

      <div>
        <label>Options:</label>
        {options.map((option, index) => (
          <div key={index} className="option">
            <input
              ref={(el) => (optionRefs.current[index] = el)}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value, e)}
              onKeyDown={(e) => handleOptionChange(index, option, e)}
              placeholder={`Option ${index + 1}`}
            />
            <button
              onClick={() => removeOption(index)}
              disabled={options.length === 1}
            >
              Remove
            </button>
          </div>
        ))}
        <button className="add-option" onClick={() => addOption()}>
          Add Option
        </button>
      </div>

      <button className="save-question-button" onClick={handleSubmit}>
        Save Question
      </button>

      <button className="navigate-button" onClick={saveQuizAndNavigate}>
        Save Quiz and Go to Builded Test
      </button>

      <div className="test-preview">
        <h3>Preview of Your Test</h3>
        {questionsList.map((q) => (
          <div key={q.id} className="question-preview">
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
            <FontAwesomeIcon
              icon={faTrashCan}
              className="delete-question-button"
              onClick={() => deleteQuestion(q.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestBuilder;
