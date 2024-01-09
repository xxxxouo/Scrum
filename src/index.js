import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import state from "state/index";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> // 与拖拽组件冲突 故注释
  <BrowserRouter>
    <Provider store={state}>
      <App />
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
