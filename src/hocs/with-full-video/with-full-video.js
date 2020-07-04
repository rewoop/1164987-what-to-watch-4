import React, {createRef, PureComponent} from 'react';
import PropTypes from "prop-types";

const withFullVideo = (Component) => {
  class WithFullVideo extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this._pauseVideo = this._pauseVideo.bind(this);
      this._setFullScreen = this._setFullScreen.bind(this);

      this.state = {
        isPlaying: true,
        isPause: false,
        progress: 0,
        duration: 0,
        pageId: 1
      };
    }

    _pauseVideo() {
      this.setState((prevState) => {
        return {isPlaying: !prevState.isPlaying};
      });
    }

    _formatDurationToTime(duration) {
      let time = parseInt(duration, 10);
      let hours = Math.floor(time / 3600);
      let minutes = Math.floor((time - (hours * 3600)) / 60);
      let seconds = time - (hours * 3600) - (minutes * 60);

      if (hours < 10) {
        hours = `0` + hours;
      }
      if (minutes < 10) {
        minutes = `0` + minutes;
      }
      if (seconds < 10) {
        seconds = `0` + seconds;
      }
      return hours + `:` + minutes + `:` + seconds;
    }

    _setFullScreen() {
      const video = this._videoRef.current;
      video.requestFullscreen();
    }

    componentDidMount() {
      const {film, id} = this.props;
      const video = this._videoRef.current;

      this.setState({
        pageId: id
      });

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
          isPause: false,
        });
      };

      video.onpause = () => this.setState({
        isPlaying: false,
        isPause: true,
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
      return <Component
        {...this.props}
        pageId={this.state.pageId}
        progress={this.state.progress}
        duration={this.state.duration}
        isPlaying={this.state.isPlaying}
        formatDurationToTime={this._formatDurationToTime}
        pauseVideo={this._pauseVideo}
        setFullScreen={this._setFullScreen}
      >
        <video
          ref={this._videoRef}
          className="player__video"
          poster="img/player-poster.jpg"
        />
      </Component>;
    }
  }

  WithFullVideo.propTypes = {
    film: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  };

  return WithFullVideo;
};

export default withFullVideo;
