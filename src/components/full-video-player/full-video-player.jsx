import React, {PureComponent, createRef, Fragment} from "react";
import PropTypes from "prop-types";

class FullVideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this._pauseVideo = this._pauseVideo.bind(this);

    this.state = {
      isPlaying: true,
      progress: 0,
    };
  }

  _pauseVideo() {
    this.setState((prevState) => {
      return {isPlaying: !prevState.isPlaying};
    });
  }

  componentDidMount() {
    const {film} = this.props;
    const video = this._videoRef.current;

    video.src = film;
    video.play();

    video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    video.onpause = () => this.setState({
      isPlaying: false,
    });

    video.ontimeupdate = () => this.setState({
      progress: Math.floor(video.currentTime),
    });
  }

  componentWillUnmount() {
    const video = this._videoRef.current;
    video.onplay = null;
    video.onpause = null;
    video.ontimeupdate = null;
    video.src = ``;
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  render() {
    return <Fragment>
      <div className="player">
        <video
          ref={this._videoRef}
          className="player__video"
          poster="img/player-poster.jpg"
        />

        <button type="button" className="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={this.state.progress} max="100"/>
              <div className="player__toggler" style={{left: this.state.progress + `%`}}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play"
              onClick={this._pauseVideo}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"/>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"/>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </Fragment>;
  }
}

FullVideoPlayer.propTypes = {
  film: PropTypes.string.isRequired,
};

export default FullVideoPlayer;
