import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Select the body element and create a new div element to mount the React app
const body = document.querySelector("body");
const app = document.createElement("div");
app.id = "summaryToolTip";

// Prepend the new app div to the body if the body element exists
if (body) {
  body.prepend(app);
}

// Get the app container element and create a new React root
const container = document.getElementById("summaryToolTip");
const root = createRoot(container!);

// Render the App component inside a StrictMode component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);