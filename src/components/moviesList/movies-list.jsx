// Core
import React from "react";
import {shape, arrayOf, string, number} from "prop-types";

// Components
import withActiveItem from "../hocs/withActiveItem/with-active-item.jsx";
import SmallMovieCard from "../smallMovieCard/small-movie-card.jsx";

const MoviesList = (props) => {
  const {films, changeGenre, setActiveFilm} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film) => (
        <SmallMovieCard
          key={`${film.id}${film.name}`}
          id={film.id}
          title={film.name}
          poster={film.poster}
          genre={film.genre}
          preview={film.preview}
          changeGenre={changeGenre}
          setActiveFilm={setActiveFilm}
        />
      ))}
    </div>
  );
};

MoviesList.propTypes = {
  films: arrayOf(
      shape({
        id: number.isRequired,
        name: string.isRequired,
        genre: string.isRequired,
        poster: string.isRequired,
        preview: string.isRequired
      })
  ).isRequired
};

export {MoviesList};

export default withActiveItem(MoviesList);
