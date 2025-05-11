import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Ensure Bootstrap is loaded
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Correct way to render in React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
 
    <App />
)

