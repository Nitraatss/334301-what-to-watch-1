// Core
import React from "react";
import {arrayOf, shape, string} from "prop-types";

// Components
import Main from "../main/main.jsx";

const App = (props) => {
  const {films} = props;

  return <Main films={films} />;
};

App.propTypes = {
  films: arrayOf(
      shape({
        id: string.isRequired,
        title: string.isRequired,
        genre: arrayOf(string).isRequired,
        poster: string.isRequired,
        preview: string.isRequired
      })
  ).isRequired
};

export default App;
