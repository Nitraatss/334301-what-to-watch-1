// Core
import React from "react";
import {string, func} from "prop-types";

// Mocks
import genres from "../../mocks/genres.js";

const GenresList = (props) => {
  const {activeGenre, onGenreClick} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          className={`catalog__genres-item ${
            genre === activeGenre ? `catalog__genres-item--active` : ``
          }`}
        >
          <a
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              onGenreClick(genre);
            }}
            className="catalog__genres-link"
          >
            {genre}
          </a>
        </li>
      ))}
    </ul>
  );
};

GenresList.propTypes = {
  activeGenre: string.isRequired,
  onGenreClick: func.isRequired
};

export default GenresList;
