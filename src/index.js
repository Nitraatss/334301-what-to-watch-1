// Core
import React from "react";
import ReactDOM from "react-dom";

// Components
import {App} from "./components/app/app.jsx";

const init = () => {
  const filmsTitles = [
    `John Wick`,
    `Killers Bodyguard`,
    `Ocean's Eleven`,
    `Tomorrow Never Dies`
  ];

  ReactDOM.render(
      <App filmsTitles={filmsTitles} />,
      document.querySelector(`#root`)
  );
};

init();
