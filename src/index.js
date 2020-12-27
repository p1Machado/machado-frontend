import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "app/api/axios";
import reportWebVitals from "./reportWebVitals";
import * as Sentry from "@sentry/browser";

if (process.env.NODE_ENV === "production" && process.env.REACT_APP_SENTRY_RELEASE) {
  Sentry.init({
    dsn: "https://a11d5b77b2894981974ae02a60a075df@sentry.io/1867651",
    release: process.env.REACT_APP_SENTRY_RELEASE,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
