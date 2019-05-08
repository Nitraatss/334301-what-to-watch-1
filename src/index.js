// Core
import React from "react";
import ReactDOM from "react-dom";

// Components
import App from "./components/app/app.jsx";

// Mocks
import films from "./mocks/films.js";

const init = () => {
  ReactDOM.render(<App films={films} />, document.querySelector(`#root`));
};

init();
