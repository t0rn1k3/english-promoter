import "./BuildedTest.css";

const BuildedTest = ({ taskExplanation, questionsList }) => {
  return (
    <div className="builded-test">
      <div className="builded-h2">
        <h2>ინგლისური ენა</h2>
        <p>იმიტირებული ტესტირება</p>
      </div>
      <div>
        <p className="task-details">{taskExplanation}</p>
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
              <li key={index}>{option.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default BuildedTest;
