// Core
import React from "react";
import {arrayOf, shape, string, func, number, bool} from "prop-types";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";
import {withRouter} from "react-router";
import {compose} from "redux";

// Reducer
import {
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms,
  actionFormVisibleFilms,
  actionClearVisibleFilms,
  actionChangeActiveFilm
} from "../../reducer/filmsData/films-data";

// Components
import Main from "../main/main.jsx";
import SignIn from "../signIn/sign-in.jsx";
import Favorites from "../favorites/favorites.jsx";
import MoviePage from "../moviePage/movie-page.jsx";

const App = (props) => {
  const {
    authorized,
    films,
    visibleFilms,
    genres,
    activeGenre,
    changeGenre,
    onShowMoreClick,
    currentUser,
    activeFilm,
    setActiveFilm
  } = props;

  const homeRedirect = () => {
    setActiveFilm();
    changeGenre();
    props.history.push(`/`);
  };

  const mainProps = {
    films,
    visibleFilms,
    genres,
    activeGenre,
    changeGenre,
    onShowMoreClick,
    activeFilm,
    setActiveFilm
  };

  const favoritesProps = {authorized, homeRedirect};

  const filmProps = {
    visibleFilms,
    film: activeFilm,
    setActiveFilm,
    changeGenre,
    homeRedirect
  };

  return (
    <Switch>
      <Route path="/" exact render={() => <Main {...mainProps} />} />
      <Route path="/login" render={() => <SignIn />} />
      <Route
        path="/favorites"
        render={() => <Favorites {...favoritesProps} />}
      />
      <Route path="/film/:id" render={() => <MoviePage {...filmProps} />} />
    </Switch>
  );
};

App.propTypes = {
  authorized: bool.isRequired,
  activeGenre: string.isRequired,
  genres: arrayOf(string.isRequired),
  films: arrayOf(
      shape({
        id: number.isRequired,
        name: string.isRequired,
        genre: string.isRequired,
        poster: string.isRequired,
        preview: string.isRequired
      })
  ).isRequired,
  visibleFilms: arrayOf(
      shape({
        id: number.isRequired,
        name: string.isRequired,
        genre: string.isRequired,
        poster: string.isRequired,
        preview: string.isRequired
      })
  ).isRequired,
  currentUser: shape({
    userId: number.isRequired,
    userEmail: string.isRequired,
    userName: string.isRequired,
    userAvatar: string.isRequired
  }),
  changeGenre: func.isRequired,
  onShowMoreClick: func.isRequired,
  setActiveFilm: func.isRequired
};

const mapStateToProps = (state) => ({
  activeGenre: state.filmsData.activeGenre,
  films: state.filmsData.films,
  activeFilm: state.filmsData.activeFilm,
  visibleFilms: state.filmsData.visibleFilms,
  genres: state.filmsData.genres,
  authorized: state.user.authorized,
  currentUser: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre: (newGenre = `All genres`) => {
    dispatch(actionChangeGenre(newGenre));

    if (newGenre === `All genres`) {
      dispatch(actionShowAllFilms());
    } else {
      dispatch(actionChangeFilms());
    }

    dispatch(actionClearVisibleFilms());
    dispatch(actionFormVisibleFilms());
  },

  onShowMoreClick: () => {
    dispatch(actionFormVisibleFilms());
  },

  setActiveFilm: (filmId = null) => {
    dispatch(actionChangeActiveFilm(filmId));

    dispatch(actionClearVisibleFilms());
    dispatch(actionFormVisibleFilms());
  }
});

export {App};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(App);
