// Core
import React from "react";
import ReactDOM from "react-dom";

// Components
import {App} from "./components/app/app.jsx";

const init = () => {
  ReactDOM.render(<App />, document.querySelector(`#root`));
};

init();
