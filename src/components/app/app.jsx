// Core
import {arrayOf, bool, func, number, shape, string} from "prop-types";
import React, {PureComponent} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {Switch, Route} from "react-router-dom";

// Reducer
import {
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms,
  actionFormVisibleFilms,
  actionClearVisibleFilms,
  actionChangeActiveFilm,
  operationAddFilmToFavorite
} from "../../reducer/filmsData/films-data";

// Components
import Main from "../main/main.jsx";
import SignIn from "../signIn/sign-in.jsx";
import Favorites from "../favorites/favorites.jsx";
import MoviePage from "../moviePage/movie-page.jsx";
import ReviewPage from "../reviewPage/review-page.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.onHomeRedirect = this.onHomeRedirect.bind(this);
  }

  onHomeRedirect() {
    const {onActiveFilmSet, onGenreChange, history} = this.props;

    onActiveFilmSet();
    onGenreChange();
    history.push(`/`);
  }

  render() {
    const {
      authorized,
      films,
      visibleFilms,
      genres,
      activeGenre,
      onGenreChange,
      onShowMoreClick,
      activeFilm,
      onActiveFilmSet,
      onAddFilmToFavorite
    } = this.props;

    const mainProps = {
      authorized,
      films,
      visibleFilms,
      genres,
      activeGenre,
      onGenreChange,
      onShowMoreClick,
      activeFilm,
      onActiveFilmSet,
      onAddFilmToFavorite
    };

    const favoritesProps = {
      authorized,
      onHomeRedirect: this.onHomeRedirect,
      onGenreChange,
      onActiveFilmSet
    };

    const filmProps = {
      authorized,
      visibleFilms,
      activeFilm,
      onActiveFilmSet,
      onGenreChange,
      onHomeRedirect: this.onHomeRedirect,
      onAddFilmToFavorite
    };

    const reviewProps = {
      authorized,
      activeFilm,
      onHomeRedirect: this.onHomeRedirect
    };

    return (
      <Switch>
        <Route path="/" exact render={() => <Main {...mainProps} />} />
        <Route
          path="/login"
          render={() => <SignIn onHomeRedirect={this.onHomeRedirect} />}
        />
        <Route
          path="/favorites"
          render={() => <Favorites {...favoritesProps} />}
        />
        <Route
          path="/films/:id/review"
          render={() => <ReviewPage {...reviewProps} />}
        />
        <Route path="/film/:id" render={() => <MoviePage {...filmProps} />} />
      </Switch>
    );
  }
}

App.propTypes = {
  authorized: bool.isRequired,
  activeGenre: string.isRequired,
  onAddFilmToFavorite: func.isRequired,
  onGenreChange: func.isRequired,
  onShowMoreClick: func.isRequired,
  onActiveFilmSet: func.isRequired,
  history: shape({
    push: func.isRequired
  }).isRequired,
  activeFilm: shape({
    backgroundImage: string,
    description: string,
    director: string,
    genre: string,
    id: number,
    isFavorite: bool,
    name: string,
    poster: string,
    posterImage: string,
    preview: string,
    rating: number,
    released: number,
    runTime: number,
    scoresCount: number,
    starring: arrayOf(string),
    videoLink: string
  }).isRequired,
  genres: arrayOf(string.isRequired),
  films: arrayOf(
      shape({
        backgroundImage: string,
        description: string,
        director: string,
        genre: string,
        id: number,
        isFavorite: bool,
        name: string,
        poster: string,
        posterImage: string,
        preview: string,
        rating: number,
        released: number,
        runTime: number,
        scoresCount: number,
        starring: arrayOf(string),
        videoLink: string
      })
  ).isRequired,
  visibleFilms: arrayOf(
      shape({
        backgroundImage: string,
        description: string,
        director: string,
        genre: string,
        id: number,
        isFavorite: bool,
        name: string,
        poster: string,
        posterImage: string,
        preview: string,
        rating: number,
        released: number,
        runTime: number,
        scoresCount: number,
        starring: arrayOf(string),
        videoLink: string
      })
  ).isRequired
};

const mapStateToProps = (state) => ({
  activeGenre: state.filmsData.activeGenre,
  films: state.filmsData.films,
  activeFilm: state.filmsData.activeFilm,
  visibleFilms: state.filmsData.visibleFilms,
  genres: state.filmsData.genres,
  authorized: state.user.authorized
});

const mapDispatchToProps = (dispatch) => ({
  onGenreChange: (newGenre = `All genres`) => {
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

  onActiveFilmSet: (filmId = null) => {
    dispatch(actionChangeActiveFilm(filmId));

    dispatch(actionClearVisibleFilms());
    dispatch(actionFormVisibleFilms(filmId));
  },

  onAddFilmToFavorite: (filmId, filmStatus) => {
    dispatch(operationAddFilmToFavorite(filmId, filmStatus));
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
