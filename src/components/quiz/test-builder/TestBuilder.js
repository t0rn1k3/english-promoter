import React, { useState } from "react";
import "./TestBuilder.css";

const TestBuilder = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [questionsList, setQuestionsList] = useState([]); // Array to store multiple questions

  // Update the question text
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  // Update a specific option
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  // Add a new option field
  const addOption = () => {
    setOptions([...options, ""]);
  };

  // Remove an option field
  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  // Save or submit the test
  const handleSubmit = () => {
    const newQuestion = {
      id: questionsList.length + 1,
      question,
      options: options.filter((option) => option.trim() !== ""), // Remove empty options
    };

    // Add the new question to the list
    setQuestionsList([...questionsList, newQuestion]);

    // Reset the form
    setQuestion("");
    setOptions([""]);
  };

  return (
    <div className="test-maker">
      <h2>Create a New Question</h2>

      {/* Question Input */}
      <div>
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter your question"
        />
      </div>

      {/* Options Input */}
      <div>
        <label>Options:</label>
        {options.map((option, index) => (
          <div key={index} className="option">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
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
        <button onClick={addOption}>Add Option</button>
      </div>

      {/* Submit Button */}
      <button className="save-question-button" onClick={handleSubmit}>
        Save Question
      </button>

      {/* Test Preview */}
      {questionsList.length > 0 && (
        <div className="test-preview">
          <h3>Preview of Your Test</h3>
          {questionsList.map((q) => (
            <div key={q.id} className="question-preview">
              <p>
                <strong>
                  {q.id}. {q.question}
                </strong>
              </p>
              {q.options.length > 0 ? (
                <ul>
                  {q.options.map((option, index) => (
                    <li key={index}>
                      <label>
                        <input type="radio" name={`question-${q.id}`} />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestBuilder;
