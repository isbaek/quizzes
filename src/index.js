import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./components/main";
import registerServiceWorker from "./registerServiceWorker";

const root = document.getElementById("root");

if (root !== null) {
  ReactDOM.render(<Main />, root);
  registerServiceWorker();
}
