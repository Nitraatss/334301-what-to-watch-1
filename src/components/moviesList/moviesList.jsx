// Core
import React from "react";
import {shape, arrayOf, string, func} from "prop-types";

// Components
import highOrderComponent from "../highOrderComponent/highOrderComponent.jsx";
import SmallMovieCard from "../smallMovieCard/smallMovieCard.jsx";

const MoviesList = (props) => {
  const {films, handelActiveCardChange} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film) => (
        <SmallMovieCard
          key={film.id}
          id={film.id}
          title={film.title}
          preview={film.preview}
          onButtonClick={handelActiveCardChange}
        />
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  films: arrayOf(
      shape({
        id: string.isRequired,
        title: string.isRequired,
        genre: arrayOf(string).isRequired,
        preview: string.isRequired
      })
  ).isRequired,
  handelActiveCardChange: func.isRequired
};

export default highOrderComponent(MoviesList);
