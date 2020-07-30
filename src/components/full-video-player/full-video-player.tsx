import * as React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import history from "../../history";

interface Props {
  title: string;
  progress: number;
  duration: number;
  isPlaying: boolean;
  formatDurationToTime: (currentTime: number) => string;
  playbackToggleVideo: () => void;
  setFullScreen: () => void;
  children: React.ReactNode;
}

const FullVideoPlayer: React.FunctionComponent<Props> = (props: Props) => {
  const {title, progress, duration, isPlaying, formatDurationToTime, playbackToggleVideo, setFullScreen, children} = props;

  return <React.Fragment>
    <div className="player">
      {children}
      <Link to={AppRoute.ROOT} onClick={() => history.goBack()} type="button" className="player__exit">Exit</Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max={duration}/>
            <div className="player__toggler" style={{left: ((progress * 100) / duration) + `%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatDurationToTime(duration - progress)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play"
            onClick={playbackToggleVideo}>

            {isPlaying ?
              <React.Fragment>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"/>
                </svg>
                <span>Pause</span>
              </React.Fragment>
              :
              <React.Fragment>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Play</span>
              </React.Fragment>}

          </button>

          <div className="player__name">{title}</div>

          <button type="button" className="player__full-screen"
            onClick={setFullScreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  </React.Fragment>;
};

export default FullVideoPlayer;
