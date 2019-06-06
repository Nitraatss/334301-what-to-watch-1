// Core
import React, {PureComponent} from "react";
import {number, string, func, shape} from "prop-types";
import {withRouter} from "react-router";
import {compose} from "redux";

// Components
import Videoplayer from "../videoplayer/videoplayer.jsx";

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = React.createRef();

    this._handelMouseEnter = this._handelMouseEnter.bind(this);
    this._handelMouseLeave = this._handelMouseLeave.bind(this);
    this._handelLinkClick = this._handelLinkClick.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {title, poster, preview, id} = this.props;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handelMouseEnter}
        onMouseLeave={this._handelMouseLeave}
      >
        <div className="small-movie-card__image">
          <Videoplayer preview={preview} poster={poster} ref={this._videoRef} />
        </div>
        <h3 className="small-movie-card__title">
          <a
            className="small-movie-card__link"
            onClick={this._handelLinkClick}
            params={{id}}
          >
            {title}
          </a>
        </h3>
      </article>
    );
  }

  _handelLinkClick() {
    const {changeGenre, setActiveFilm, history, genre, id} = this.props;
    changeGenre(genre);
    setActiveFilm(id);
    this.props.history.push(`/film/${id}`, {id});
  }

  _handelMouseEnter() {
    const {id} = this.props;

    this.timer = setTimeout(
        function () {
          this._videoRef.current.video.current.play();
        }.bind(this),
        1000
    );
  }

  _handelMouseLeave() {
    if (this.timer) {
      clearTimeout(this.timer);
      this._videoRef.current.video.current.load();
    }
  }
}

SmallMovieCard.propTypes = {
  id: number.isRequired,
  title: string.isRequired,
  poster: string.isRequired,
  preview: string.isRequired,
  history: shape({
    push: func.isRequired
  }).isRequired
};

export {SmallMovieCard};

export default compose(withRouter)(SmallMovieCard);
