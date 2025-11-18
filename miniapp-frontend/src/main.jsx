import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Tailwind / styles
import App from "./App";
import DEBUG_API from "./utils/debug";

// Make debug function available globally
window.DEBUG_API = DEBUG_API;

// Global error handler for unhandled errors
window.addEventListener('error', (event) => {
  console.error('Global Error:', event.error);
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
});

// Check if root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found! Check index.html');
} else {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

