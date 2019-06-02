// Core
import React, {PureComponent} from "react";
import {arrayOf, shape, string, func, number, bool} from "prop-types";
import {connect} from "react-redux";

// Reducer
import {
  actionChangeGenre,
  actionChangeFilms,
  actionShowAllFilms
} from "../../reducer/filmsData/filmsData";

// Components
import Main from "../main/main.jsx";
import SignIn from "../signIn/signIn.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      choosedScreen: `main`
    };

    this._renderScreen = this._renderScreen.bind(this);
    this.changeScreen = this.changeScreen.bind(this);
  }

  changeScreen(newScreen) {
    this.setState({
      choosedScreen: newScreen
    });
  }

  _renderScreen() {
    const {
      authorized,
      films,
      genres,
      activeGenre,
      onGenreClick,
      currentUser
    } = this.props;
    const {choosedScreen} = this.state;

    switch (choosedScreen) {
      case `main`:
        return (
          <Main
            authorized={authorized}
            films={films}
            genres={genres}
            activeGenre={activeGenre}
            onGenreClick={onGenreClick}
            changeScreen={this.changeScreen}
            userAvatar={currentUser.userAvatar}
            userName={currentUser.userName}
          />
        );

      case `login`:
        return <SignIn changeScreen={this.changeScreen} />;

      default:
        return (
          <Main
            authorized={authorized}
            films={films}
            genres={genres}
            activeGenre={activeGenre}
            onGenreClick={onGenreClick}
            changeScreen={this.changeScreen}
            userAvatar={currentUser.userAvatar}
            userName={currentUser.userName}
          />
        );
    }
  }

  render() {
    return this._renderScreen();
  }
}

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

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeGenre: state.filmsData.activeGenre,
    films: state.filmsData.films,
    genres: state.filmsData.genres,
    authorized: state.user.isAuthorizationRequired,
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
