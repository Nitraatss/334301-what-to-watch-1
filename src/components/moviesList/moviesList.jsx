// Core
import React from "react";
import {shape, arrayOf, string, func} from "prop-types";

// Components
import withActiveCard from "../hocs/withActiveCard/withActiveCard.jsx";
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
          poster={film.poster}
          preview={film.preview}
          onSmallCardEnter={handelActiveCardChange}
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
        poster: string.isRequired,
        preview: string.isRequired
      })
  ).isRequired,
  handelActiveCardChange: func.isRequired
};

export default withActiveCard(MoviesList);
