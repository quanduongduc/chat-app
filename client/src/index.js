import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import mobileDetect from "./utils/mobileDectect";
import mobileError from "./assets/images/mobile_error.jpeg";
console.log(mobileError);

console.log(
  mobileDetect(navigator.userAgent || navigator.vendor || window.opera)
);
ReactDOM.render(
  <React.StrictMode>
    {!mobileDetect(navigator.userAgent || navigator.vendor || window.opera) ? (
      <div
        className="w-screen h-screen flex justify-center items-center"
        style={{
          background: `url(${mobileError}) no-repeat`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `cover`,
          backgroundPosition: `left center`,
        }}
      >
        <h1 className=" max-w-sm text-2xl font-bold">
          Mobile Version is currently not supported
        </h1>
      </div>
    ) : (
      <App />
    )}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
