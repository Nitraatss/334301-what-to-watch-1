// Core
import React from "react";
import {string, func} from "prop-types";

const SmallMovieCard = (props) => {
  const {title, preview, id, onButtonClick} = props;

  return (
    <article className="small-movie-card catalog__movies-card">
      <button
        className="small-movie-card__play-btn"
        type="button"
        onClick={() => {
          onButtonClick(id);
        }}
      >
        Play
      </button>
      <div className="small-movie-card__image">
        <img src={preview} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">
          {title}
        </a>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  preview: string.isRequired,
  onButtonClick: func.isRequired
};

export default SmallMovieCard;
