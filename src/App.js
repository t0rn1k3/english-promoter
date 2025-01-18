import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestBuilder from "./components/quiz/test-builder/TestBuilder";
import BuildedTest from "./components/quiz/builded-test/BuildedTest";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestBuilder />} />
        <Route path="/test" element={<BuildedTest />} />
      </Routes>
    </Router>
  );
};

export default App;
