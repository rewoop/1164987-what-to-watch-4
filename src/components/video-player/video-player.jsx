import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";


export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isPlaying: props.isPlaying,
    };
  }

  render() {
    const {poster} = this.props;

    return (
      <Fragment>
        <video
          className={`player__video`}
          ref={this._videoRef}
          poster={poster}
          muted
        />
      </Fragment>
    );
  }

  componentDidMount() {
    const {src} = this.props;
    const video = this._videoRef.current;

    video.src = src;

    video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.onplay = null;
    video.src = ``;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      setTimeout(() => video.play(), 1000);
    } else {
      setTimeout(() => video.load(), 1000);
    }
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
};
