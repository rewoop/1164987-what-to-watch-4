import React, {createRef, PureComponent} from 'react';
import PropTypes from "prop-types";

const withFullVideo = (Component) => {
  class WithFullVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this._playbackToggleVideo = this._playbackToggleVideo.bind(this);
      this._setFullScreen = this._setFullScreen.bind(this);

      this.state = {
        isPlaying: true,
        progress: 0,
        duration: 0,
      };
    }

    _playbackToggleVideo() {
      this.setState((prevState) => {
        return {isPlaying: !prevState.isPlaying};
      });
    }

    _formatDurationToTime(duration) {
      const time = parseInt(duration, 10);
      const hours = Math.floor(time / 3600).toString().padStart(2, `0`);
      const minutes = Math.floor((time - (hours * 3600)) / 60).toString().padStart(2, `0`);
      const seconds = time - (hours * 3600) - (minutes * 60).toString().padStart(2, `0`);

      return `${hours}:${minutes}:${seconds}`;
    }

    _setFullScreen() {
      const video = this._videoRef.current;
      video.requestFullscreen();
    }

    componentDidMount() {
      const {film} = this.props;
      const video = this._videoRef.current;

      video.src = film;
      video.play();

      video.onloadedmetadata = () => {
        this.setState({
          duration: video.duration,
        });
      };

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
      video.onloadedmetadata = null;
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
      return <Component
        {...this.props}
        progress={this.state.progress}
        duration={this.state.duration}
        isPlaying={this.state.isPlaying}
        formatDurationToTime={this._formatDurationToTime}
        playbackToggleVideo={this._playbackToggleVideo}
        setFullScreen={this._setFullScreen}
      >
        <video
          ref={this._videoRef}
          className="player__video"
          poster="/img/player-poster.jpg"
        />
      </Component>;
    }
  }

  WithFullVideo.propTypes = {
    film: PropTypes.string,
  };

  return WithFullVideo;
};

export default withFullVideo;
