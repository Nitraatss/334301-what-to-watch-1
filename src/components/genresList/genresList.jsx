// Core
import React from "react";
import {string, func} from "prop-types";

const GenresList = (props) => {
  const {activeGenre, onGenreClick} = props;

  const genres = [
    `All genres`,
    `Comedies`,
    `Crime`,
    `Documentary`,
    `Dramas`,
    `Horror`,
    `Kids & Family`,
    `Romance`,
    `Sci-Fi`,
    `Thrillers`
  ];

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
