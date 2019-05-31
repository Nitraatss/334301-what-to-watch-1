// Core
import React from "react";
import {arrayOf, string, func} from "prop-types";

// Components
import withActiveItem from "../hocs/withActiveItem/withActiveItem.jsx";

const GenresList = (props) => {
  const {
    activeItem: activeGenre,
    changeActiveItem: handelGenreClick,
    genres
  } = props;

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
              handelGenreClick(genre);
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
  genres: arrayOf(string.isRequired),
  activeItem: string.isRequired,
  changeActiveItem: func.isRequired
};

export default withActiveItem(GenresList);
