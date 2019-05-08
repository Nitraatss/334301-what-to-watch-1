// Core
import React, {PureComponent} from "react";
import {shape, arrayOf, string} from "prop-types";

// Components
import SmallMovieCard from "../smallMovieCard/smallMovieCard.jsx";

export class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCardIndex: null
    };

    this.handelActiveCardChange = this.handelActiveCardChange.bind(this);
  }

  render() {
    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film) => (
          <SmallMovieCard
            key={film.id}
            id={film.id}
            title={film.title}
            preview={film.preview}
            onButtonClick={this.handelActiveCardChange}
          />
        ))}
      </div>
    );
  }

  handelActiveCardChange(activeCardIndex) {
    this.setState({activeCardIndex});
  }
}

MoviesList.propTypes = {
  films: arrayOf(
      shape({
        id: string.isRequired,
        title: string.isRequired,
        genre: arrayOf(string).isRequired,
        preview: string.isRequired
      })
  ).isRequired
};

export default MoviesList;
