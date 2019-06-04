// Core
import React from "react";
import {arrayOf, shape, string, func, number, bool} from "prop-types";
import {connect} from "react-redux";
import {Switch, Route} from "react-router-dom";

// Reducer
import {
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms
} from "../../reducer/filmsData/films-data";

// Components
import Main from "../main/main.jsx";
import SignIn from "../signIn/sign-in.jsx";
import Favorites from "../favorites/favorites.jsx";

const App = (props) => {
  const {
    authorized,
    films,
    genres,
    activeGenre,
    onGenreClick,
    currentUser
  } = props;

  const data = {
    authorized,
    films,
    genres,
    activeGenre,
    onGenreClick,
    userAvatar: `https://es31-server.appspot.com/` + currentUser.userAvatar,
    userName: currentUser.userName
  };

  return (
    <Switch>
      <Route path="/" exact render={() => <Main {...data} />} />
      <Route path="/login" render={() => <SignIn />} />
      <Route
        path="/favorites"
        render={() => <Favorites authorized={authorized} />}
      />
    </Switch>
  );
};

App.propTypes = {
  authorized: bool.isRequired,
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
  ).isRequired,
  currentUser: shape({
    userId: number.isRequired,
    userEmail: string.isRequired,
    userName: string.isRequired,
    userAvatar: string.isRequired
  })
};

const mapStateToProps = (state) => ({
  activeGenre: state.filmsData.activeGenre,
  films: state.filmsData.films,
  genres: state.filmsData.genres,
  authorized: state.user.authorized,
  currentUser: state.user.currentUser
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
