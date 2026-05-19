import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { PortfolioProvider } from "./context/PortfolioContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./styles/global/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PortfolioProvider>
          <App />
          <Toaster position="top-right" toastOptions={{ className: "toast-glass" }} />
        </PortfolioProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
