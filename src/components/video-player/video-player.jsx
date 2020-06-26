import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";


export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
    this._timeoutPlayHandler = null;
  }

  _timeoutClear() {
    clearTimeout(this._timeoutPlayHandler);
    this._timeoutPlayHandler = null;
  }

  componentDidMount() {
    const {src, muted} = this.props;
    const video = this._videoRef.current;

    video.src = src;
    video.muted = muted;
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.onplay = null;
    video.muted = null;
    video.src = ``;
    this._timeoutClear();
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      this._timeoutPlayHandler = setTimeout(() => video.play(), 1000);
    } else {
      if (this._timeoutPlayHandler) {
        this._timeoutClear();
      }
      video.load();
    }
  }

  render() {
    const {poster} = this.props;

    return (
      <video
        className={`player__video`}
        ref={this._videoRef}
        poster={poster}
      />
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  muted: PropTypes.bool.isRequired,
};
