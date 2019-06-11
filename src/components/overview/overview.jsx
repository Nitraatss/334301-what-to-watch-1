// Core
import {arrayOf, bool, number, shape, string} from "prop-types";
import React, {PureComponent} from "react";

const FilmRating = {
  BAD: `bad`,
  NORMAL: `normal`,
  GOOD: `good`,
  VERY_GOOD: `very good`,
  AWESOME: `awesome`
};

class Overview extends PureComponent {
  constructor(props) {
    super(props);

    this._formTextRating = this._formTextRating.bind(this);
  }

  render() {
    const {activeFilm} = this.props;

    return (
      <>
        <div className="movie-rating">
          <div className="movie-rating__score">{activeFilm.rating}</div>
          <p className="movie-rating__meta">
            <span className="movie-rating__level">
              {this._formTextRating(activeFilm.rating)}
            </span>
            <span className="movie-rating__count">
              {activeFilm.scoresCount} ratings
            </span>
          </p>
        </div>

        <div className="movie-card__text">
          <p>{activeFilm.description}</p>

          <p className="movie-card__director">
            <strong>{activeFilm.director}</strong>
          </p>

          <p className="movie-card__starring">
            <strong>{activeFilm.starring.join(`, `)}</strong>
          </p>
        </div>
      </>
    );
  }

  _formTextRating(numberRating) {
    if (numberRating >= 0 && numberRating < 3) {
      return FilmRating.BAD;
    }

    if (numberRating >= 3 && numberRating < 5) {
      return FilmRating.NORMAL;
    }

    if (numberRating >= 5 && numberRating < 8) {
      return FilmRating.GOOD;
    }

    if (numberRating >= 8 && numberRating < 10) {
      return FilmRating.VERY_GOOD;
    }

    return FilmRating.AWESOME;
  }
}

Overview.propTypes = {
  activeFilm: shape({
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
  }).isRequired
};

export default Overview;
