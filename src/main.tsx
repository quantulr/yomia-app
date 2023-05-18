import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "overlayscrollbars/overlayscrollbars.css";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FluentProvider theme={teamsLightTheme}>
      <App />
      <ToastContainer />
    </FluentProvider>
  </React.StrictMode>
);
