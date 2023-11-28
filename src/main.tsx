import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import DarkModeContext from "./context/DarkModeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DarkModeContext>
      <App />
    </DarkModeContext>
  </React.StrictMode>
);
