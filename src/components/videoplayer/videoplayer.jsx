// Core
import React, {PureComponent} from "react";
import {string} from "prop-types";

class Videoplayer extends PureComponent {
  constructor(props) {
    super(props);
    this.video = React.createRef();
  }

  render() {
    const {poster, preview} = this.props;
    return (
      <video
        ref={this.video}
        src={preview}
        poster={poster}
        width="280"
        height="175"
        muted
      />
    );
  }
}

Videoplayer.propTypes = {
  poster: string.isRequired,
  preview: string.isRequired
};

export default Videoplayer;
