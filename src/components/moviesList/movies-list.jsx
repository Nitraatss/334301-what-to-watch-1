// Core
import React from "react";
import {arrayOf, bool, func, number, shape, string} from "prop-types";

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
  changeGenre: func.isRequired,
  setActiveFilm: func.isRequired,
  films: arrayOf(
      shape({
        backgroundColor: string.isRequired,
        backgroundImage: string.isRequired,
        description: string.isRequired,
        director: string.isRequired,
        genre: string.isRequired,
        id: number.isRequired,
        isFavorite: bool.isRequired,
        name: string.isRequired,
        poster: string.isRequired,
        posterImage: string.isRequired,
        preview: string.isRequired,
        rating: number.isRequired,
        released: number.isRequired,
        runTime: number.isRequired,
        scoresCount: number.isRequired,
        starring: arrayOf(string.isRequired),
        videoLink: string.isRequired
      })
  ).isRequired
};

export {MoviesList};

export default withActiveItem(MoviesList);
