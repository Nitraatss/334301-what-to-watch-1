// Core
import React from "react";
import {arrayOf, shape, string, func} from "prop-types";
import {connect} from "react-redux";

// Reducer
import {ActionCreator} from "../../reducer";

// Components
import Main from "../main/main.jsx";

const App = (props) => {
  const {films, activeGenre, onGenreClick} = props;

  return (
    <Main films={films} activeGenre={activeGenre} onGenreClick={onGenreClick} />
  );
};

App.propTypes = {
  activeGenre: string.isRequired,
  onGenreClick: func.isRequired,
  films: arrayOf(
      shape({
        id: string.isRequired,
        title: string.isRequired,
        genre: arrayOf(string).isRequired,
        poster: string.isRequired,
        preview: string.isRequired
      })
  ).isRequired
};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeGenre: state.activeGenre,
    films: state.films
  });

const mapDispatchToProps = (dispatch) => ({
  onGenreClick: (newGenre) => {
    dispatch(ActionCreator.changeGenre(newGenre));
    dispatch(ActionCreator.changeFilms(newGenre));
  }
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
