// Core
import {arrayOf, bool, number, shape, string} from "prop-types";
import React, {PureComponent} from "react";

const MaximumFilmsPerPack = 20;

const withVisibleFilms = (WrappedComponent) => {
  class WithVisibleFilms extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        filmsPack: 1,
        visibleFilms: []
      };
    }

    render() {
      const {films} = this.props;
      const {visibleFilms} = this.state;

      if (!visibleFilms.length) {
        if (films.length > MaximumFilmsPerPack) {
          return (
            <WrappedComponent
              {...this.props}
              films={films.slice(0, MaximumFilmsPerPack)}
            />
          );
        } else {
          return <WrappedComponent {...this.props} films={films} />;
        }
      } else {
        return <WrappedComponent {...this.props} films={visibleFilms} />;
      }
    }
  }

  WithVisibleFilms.propTypes = {
    films: arrayOf(
        shape({
          backgroundColor: string.isRequired,
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
        })
    ).isRequired
  };

  return WithVisibleFilms;
};

export default withVisibleFilms;
