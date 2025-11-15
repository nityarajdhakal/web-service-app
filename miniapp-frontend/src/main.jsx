import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Tailwind / styles
import App from "./App";
import DEBUG_API from "./utils/debug";

// Make debug function available globally
window.DEBUG_API = DEBUG_API;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

