// Core
import React, {PureComponent} from "react";
import {string, func} from "prop-types";

// Components
import withVideo from "../hocs/withVideo/withVideo.jsx";
import Videoplayer from "../videoplayer/videoplayer.jsx";

class SmallMovieCard extends PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = React.createRef();

    this._handelMouseEnter = this._handelMouseEnter.bind(this);
    this._handelMouseLeave = this._handelMouseLeave.bind(this);
  }

  componentDidMount() {
    const {checkVideoLoadStatus} = this.props;

    checkVideoLoadStatus(this._videoRef.current.video.current);
  }

  render() {
    const {title, poster, preview} = this.props;

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
          <a className="small-movie-card__link" href="movie-page.html">
            {title}
          </a>
        </h3>
      </article>
    );
  }

  _handelMouseEnter() {
    const {id, onSmallCardEnter, getVideoLoadStatus} = this.props;

    if (getVideoLoadStatus) {
      this.timer = setTimeout(
          function () {
            this._videoRef.current.video.current.play();
          }.bind(this),
          1000
      );
    }

    onSmallCardEnter(id);
  }

  _handelMouseLeave() {
    if (this.timer) {
      clearTimeout(this.timer);
      this._videoRef.current.video.current.load();
    }
  }
}

SmallMovieCard.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  poster: string.isRequired,
  preview: string.isRequired,
  onSmallCardEnter: func.isRequired,
  checkVideoLoadStatus: func.isRequired,
  getVideoLoadStatus: func.isRequired
};

export default withVideo(SmallMovieCard);
