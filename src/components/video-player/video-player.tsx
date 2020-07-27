import * as React from "react";

interface Props {
  isPlaying: boolean,
  muted: boolean,
  src: string,
  poster: string,
}

export default class VideoPlayer extends React.PureComponent<Props, {}> {
  private _videoRef: React.RefObject<HTMLVideoElement>;
  private _timeoutPlayHandler: NodeJS.Timeout;

  constructor(props) {
    super(props);

    this._videoRef = React.createRef();
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
