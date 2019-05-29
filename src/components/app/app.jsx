// Core
import React from "react";
import {arrayOf, array, shape, string, func, number} from "prop-types";
import {connect} from "react-redux";

// Reducer
import {
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms
} from "../../reducer/data/data";
import {
  getFilms,
  getGenres,
  getActiveGenre
} from "../../reducer/data/selectors";

// Components
import Main from "../main/main.jsx";

const App = (props) => {
  const {films, activeGenre, onGenreClick, genres} = props;

  return (
    <Main
      films={films}
      genres={genres}
      activeGenre={activeGenre}
      onGenreClick={onGenreClick}
    />
  );
};

App.propTypes = {
  activeGenre: string.isRequired,
  onGenreClick: func.isRequired,
  genres: array.isRequired,
  films: arrayOf(
      shape({
        id: number.isRequired,
        name: string.isRequired,
        genre: string.isRequired,
        poster_image: string.isRequired,
        preview_video_link: string.isRequired
      })
  ).isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeGenre: getActiveGenre(state),
    films: getFilms(state),
    genres: getGenres(state)
  });

const mapDispatchToProps = (dispatch) => ({
  onGenreClick: (newGenre) => {
    dispatch(actionChangeGenre(newGenre));

    if (newGenre === `All genres`) {
      dispatch(actionShowAllFilms());
    } else {
      dispatch(actionChangeFilms());
    }
  }
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
