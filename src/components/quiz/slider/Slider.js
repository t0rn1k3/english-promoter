import React, { useContext, useState } from "react";
import { TestContext } from "../../context/TextContext";
import BuildedTest from "../builded-test/BuildedTest";

const Slider = () => {
  const { taskExplanation, questionsList } = useContext(TestContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === questionsList.length ? prevIndex : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  return (
    <div className="slider">
      {questionsList.length > 0 ? (
        <>
          <div className="slider-content non-copyable">
            {currentIndex === 0 ? (
              <BuildedTest
                taskExplanation={taskExplanation}
                questionsList={questionsList}
              />
            ) : (
              ""
            )}
          </div>
          <button onClick={prevSlide} disabled={currentIndex === 0}>
            უკან დაბრუნება
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === questionsList.length}
          >
            შემდეგზე გადასვლა
          </button>
        </>
      ) : (
        <p>No questions available</p>
      )}
    </div>
  );
};

export default Slider;
