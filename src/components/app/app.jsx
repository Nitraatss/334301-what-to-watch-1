// Core
import React, {PureComponent} from "react";
import {arrayOf, shape, string, func, number, bool} from "prop-types";
import {connect} from "react-redux";

// Reducer
import {
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms
} from "../../reducer/filmsData/films-data";
import {actionChangeAuthorizationRequestStatus} from "../../reducer/user/user";

// Components
import Main from "../main/main.jsx";
import SignIn from "../signIn/sign-in.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      authorized,
      authorizationRequired,
      films,
      genres,
      activeGenre,
      onGenreClick,
      currentUser,
      showLogIn
    } = this.props;

    const data = {
      authorized,
      authorizationRequired,
      films,
      genres,
      activeGenre,
      onGenreClick,
      showLogIn,
      userAvatar: `https://es31-server.appspot.com/` + currentUser.userAvatar,
      userName: currentUser.userName
    };

    if (!authorizationRequired) {
      return <Main {...data} />;
    } else {
      return <SignIn />;
    }
  }
}

App.propTypes = {
  authorized: bool.isRequired,
  authorizationRequired: bool.isRequired,
  activeGenre: string.isRequired,
  onGenreClick: func.isRequired,
  showLogIn: func.isRequired,
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
  authorizationRequired: state.user.isAuthorizationRequired,
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
  },

  showLogIn: () => {
    dispatch(actionChangeAuthorizationRequestStatus(true));
  }
});

export {App};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
