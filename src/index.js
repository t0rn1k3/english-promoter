import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TestProvider } from "./components/context/TextContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TestProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TestProvider>
);
