import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import { TeamProvider } from "./context/TeamContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <TeamProvider>
        <App />
      </TeamProvider>
    </ThemeProvider>
  </React.StrictMode>
);
