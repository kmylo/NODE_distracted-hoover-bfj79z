import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CountProvider } from "./context/CountProvider.jsx";
import { NotesProvider } from "./context/NotesContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CountProvider>
        <NotesProvider>
          <App />
        </NotesProvider>
      </CountProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// npm create vite@latest <nombre-de-mi-proyecto>
