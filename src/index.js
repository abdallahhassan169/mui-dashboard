import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";
// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context/index";
import "bootstrap/dist/css/bootstrap.min.css";
import DashAutoComplete from "./components/common/AutoComplete";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
