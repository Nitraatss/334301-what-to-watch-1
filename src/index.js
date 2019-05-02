// Core
import React from "react";
import ReactDOM from "react-dom";

// Components
import {App} from "./components/App/index.jsx";

const init = () => {
  ReactDOM.render(<App />, document.querySelector(`#root`));
};

init();
