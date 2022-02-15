import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import config from "./config";

window.addEventListener("DOMContentLoaded", () => {
  config.forEach((item) => {
    const element = document.getElementById(item.id);
    if (element) {
      ReactDOM.render(
        <React.StrictMode>
          <item.app />
        </React.StrictMode>,
        element
      );
    }
  });
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
