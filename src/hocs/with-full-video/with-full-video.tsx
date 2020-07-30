import * as React from "react";
import {Subtract} from "utility-types";

interface Props {
  film: string;
}

interface State {
  isPlaying: boolean;
  progress: number;
  duration: number;
}

interface InjectedProps {
  progress: number;
  duration: number;
  isPlaying: boolean;
  formatDurationToTime: () => void;
  playbackToggleVideo: () => void;
  setFullScreen: () => void;
}

const withFullVideo = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithFullVideo extends React.PureComponent<T, State> {
    private _videoRef: React.RefObject<HTMLVideoElement>;
    constructor(props) {
      super(props);

      this._videoRef = React.createRef();

      this._playbackToggleVideo = this._playbackToggleVideo.bind(this);
      this._setFullScreen = this._setFullScreen.bind(this);

      this.state = {
        isPlaying: true,
        progress: 0,
        duration: 0,
      };
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
      video.controls = false;
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      if (document.fullscreenElement === null) {
        video.controls = false;
      }

      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    _playbackToggleVideo() {
      this.setState((prevState) => {
        return {isPlaying: !prevState.isPlaying};
      });
    }

    _formatDurationToTime(duration) {
      const time = parseInt(duration, 10);
      const hours: number = Math.floor(time / 3600);
      const minutes: number = Math.floor((time - (hours * 3600)) / 60);
      const seconds: number = time - (hours * 3600) - +(minutes * 60);

      return `${hours.toString().padStart(2, `0`)}:${minutes.toString().padStart(2, `0`)}:${seconds.toString().padStart(2, `0`)}`;
    }

    _setFullScreen() {
      const video = this._videoRef.current;
      video.requestFullscreen();
      video.controls = true;
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

  return WithFullVideo;
};

export default withFullVideo;
