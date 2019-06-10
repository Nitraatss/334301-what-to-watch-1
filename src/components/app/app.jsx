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
  Operation
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

    this.homeRedirect = this.homeRedirect.bind(this);
  }

  homeRedirect() {
    const {setActiveFilm, changeGenre, history} = this.props;

    setActiveFilm();
    changeGenre();
    history.push(`/`);
  }

  render() {
    const {
      authorized,
      films,
      visibleFilms,
      genres,
      activeGenre,
      changeGenre,
      onShowMoreClick,
      activeFilm,
      setActiveFilm,
      addFilmToFavorite
    } = this.props;

    const mainProps = {
      authorized,
      films,
      visibleFilms,
      genres,
      activeGenre,
      changeGenre,
      onShowMoreClick,
      activeFilm,
      setActiveFilm,
      addFilmToFavorite
    };

    const favoritesProps = {
      authorized,
      homeRedirect: this.homeRedirect,
      changeGenre,
      setActiveFilm
    };

    const filmProps = {
      authorized,
      visibleFilms,
      activeFilm,
      setActiveFilm,
      changeGenre,
      homeRedirect: this.homeRedirect,
      addFilmToFavorite
    };

    const reviewProps = {
      authorized,
      activeFilm,
      homeRedirect: this.homeRedirect
    };

    return (
      <Switch>
        <Route path="/" exact render={() => <Main {...mainProps} />} />
        <Route
          path="/login"
          render={() => <SignIn homeRedirect={this.homeRedirect} />}
        />
        <Route
          path="/favorites"
          render={() => <Favorites {...favoritesProps} />}
        />
        <Route
          path="/film/:id/review"
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
  addFilmToFavorite: func.isRequired,
  changeGenre: func.isRequired,
  onShowMoreClick: func.isRequired,
  setActiveFilm: func.isRequired,
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
    dispatch(actionFormVisibleFilms(filmId));
  },

  addFilmToFavorite: (filmId, filmStatus) => {
    dispatch(Operation.addFilmToFavourite(filmId, filmStatus));
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
