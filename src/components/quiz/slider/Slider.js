// import { useState } from "react";

// const Slider = ({ questions = [] }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === questions.length - 1 ? prevIndex : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? prevIndex : prevIndex - 1
//     );
//   };

//   return (
//     <div className="slider">
//       {questions.length > 0 ? (
//         <>
//           <button onClick={prevSlide} disabled={currentIndex === 0}>
//             Previous
//           </button>
//           <div className="slider-content">
//             <div className="slide">
//               <h2>Question {currentIndex + 1}</h2>
//               <p>{questions[currentIndex].question}</p>
//             </div>
//           </div>
//           <button
//             onClick={nextSlide}
//             disabled={currentIndex === questions.length - 1}
//           >
//             Next
//           </button>
//         </>
//       ) : (
//         <p>No questions available</p>
//       )}
//     </div>
//   );
// };

// export default Slider;
