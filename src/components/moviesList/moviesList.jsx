// Core
import React from "react";
import {shape, arrayOf, string, func, number} from "prop-types";

// Components
import withActiveItem from "../hocs/withActiveItem/withActiveItem.jsx";
import SmallMovieCard from "../smallMovieCard/smallMovieCard.jsx";

const MoviesList = (props) => {
  const {films, changeActiveItem: handelActiveCardChange} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film) => (
        <SmallMovieCard
          key={`${film.id}${film.name}`}
          id={film.id}
          title={film.name}
          poster={film.background_image}
          preview={film.preview_video_link}
          onSmallCardEnter={handelActiveCardChange}
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
        background_image: string.isRequired,
        preview_video_link: string.isRequired
      })
  ).isRequired,
  changeActiveItem: func.isRequired
};

export {MoviesList};

export default withActiveItem(MoviesList);
