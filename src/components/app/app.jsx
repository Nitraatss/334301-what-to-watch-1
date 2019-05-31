// Core
import React from "react";
import {arrayOf, shape, string, func, number} from "prop-types";
import {connect} from "react-redux";

// Reducer
import {
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms
} from "../../reducer/filmsData/filmsData";

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
  genres: arrayOf(string.isRequired),
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

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeGenre: state.filmsData.activeGenre,
    films: state.filmsData.films,
    genres: state.filmsData.genres
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
