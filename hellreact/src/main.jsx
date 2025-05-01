// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import Tokencontext from "./context/Tokencontext";
import 'react-alice-carousel/lib/alice-carousel.css';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <Tokencontext>
      <App />
    </Tokencontext>
    </BrowserRouter>
  </React.StrictMode>
);
