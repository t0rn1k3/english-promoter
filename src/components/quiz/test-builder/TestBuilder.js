import React, { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faTrashCan } from "@fortawesome/duotone-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TestContext } from "../../context/TextContext";
import { signInAnonymouslyToFirebase } from "../../../firebase";
import "./TestBuilder.css";

const TestBuilder = () => {
  const {
    taskExplanation,
    setTaskExplanation,
    questionsList,
    setQuestionsList,
  } = useContext(TestContext);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "", isCorrect: false }]);
  const navigate = useNavigate();
  const optionRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const authenticate = async () => {
      try {
        const token = await signInAnonymouslyToFirebase();
        localStorage.setItem("authToken", token);
        setIsLoading(false);
      } catch (error) {
        setError("Authentication failed. Please try again.");
      }
    };

    const existingToken = localStorage.getItem("authToken");
    if (!existingToken) {
      authenticate();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <p>იტვირთება...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleTaskExplanationChange = (e) => {
    setTaskExplanation(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, value, event) => {
    const updatedOptions = [...options];
    updatedOptions[index] = { ...updatedOptions[index], text: value };
    setOptions(updatedOptions);

    if (event && event.key === "Enter") {
      addOption(index + 1);
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index ? !option.isCorrect : option.isCorrect,
    }));
    setOptions(updatedOptions);
  };
  const addOption = (focusIndex = options.length) => {
    setOptions((prevOptions) => [
      ...prevOptions,
      { text: "", isCorrect: false },
    ]);

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
      options: options.filter((option) => option.text.trim() !== ""),
    };

    setQuestionsList([...questionsList, newQuestion]);
    setQuestion("");
    setOptions([{ text: "", isCorrect: false }]);
  };

  const saveQuizAndNavigate = () => {
    navigate("/");
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = questionsList
      .filter((q) => q.id !== id)
      .map((q, index) => ({ ...q, id: index + 1 }));
    setQuestionsList(updatedQuestions);
  };

  return (
    <div className="test-maker">
      <h2>შეკითხვის დამატება</h2>

      <div>
        <label>დავალება : </label>
        <input
          type="text"
          value={taskExplanation}
          onChange={handleTaskExplanationChange}
          placeholder="აღწერე დავალება"
          rows="3"
        />
      </div>

      <div>
        <label>შეკითხვა:</label>
        <input
          type="text"
          value={question}
          onChange={handleQuestionChange}
          placeholder="დაამატე შეკითხვა"
        />
      </div>

      <div>
        <label>სავარაუდო პასუხი:</label>
        {options.map((option, index) => (
          <div key={index} className="option">
            <div className="input-cont">
              <input
                className="option-value"
                ref={(el) => (optionRefs.current[index] = el)}
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                onKeyDown={(e) => handleOptionChange(index, option.text, e)}
                placeholder={`ვარიანტი ${index + 1}`}
              />
              <div className="checkbox-cont">
                <div className="tooltip-container">
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <span className="tooltip">მონიშნე სწორი პასუხი</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => removeOption(index)}
              disabled={options.length === 1}
            >
              წაშლა
            </button>
          </div>
        ))}
        <button className="add-option" onClick={() => addOption()}>
          დაამატე ვარიანტი
        </button>
      </div>

      <button className="save-question-button" onClick={handleSubmit}>
        შეკითხვის შენახვა
      </button>

      <div className="test-preview">
        <h3>ტესტი : </h3>
        {questionsList.map((q) => {
          return (
            <div key={q.id} className="question-preview">
              <p>
                <strong>
                  {q.id}. {q.question}
                </strong>
              </p>
              <ul>
                {q.options.map((option, index) => (
                  <li key={index}>
                    {option.text} {option.isCorrect ? "(Correct)" : ""}
                  </li>
                ))}
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={() => deleteQuestion(q.id)}
                />
              </ul>
            </div>
          );
        })}
      </div>

      <div className="test-buttons">
        <button className="navigate-button" onClick={saveQuizAndNavigate}>
          ტესტის შენახვა
        </button>
        <button className="navigate-button" onClick={saveQuizAndNavigate}>
          ტესტის დასრულება
        </button>
      </div>
    </div>
  );
};

export default TestBuilder;
