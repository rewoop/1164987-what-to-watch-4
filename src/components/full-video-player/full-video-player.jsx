import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const FullVideoPlayer = (props) => {
  const {title, onExitButtonClickHandler, progress, duration, isPlaying, formatDurationToTime, playbackToggleVideo, setFullScreen, children} = props;

  return <Fragment>
    <div className="player">
      {children}
      <Link to={AppRoute.ROOT} type="button" className="player__exit" onClick={onExitButtonClickHandler}>Exit</Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max={duration}/>
            <div className="player__toggler" style={{left: ((progress * 100) / duration) + `%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{formatDurationToTime(duration)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play"
            onClick={playbackToggleVideo}>

            {isPlaying ?
              <Fragment>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"/>
                </svg>
                <span>Pause</span>
              </Fragment>
              :
              <Fragment>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Play</span>
              </Fragment>}

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
  </Fragment>;
};

FullVideoPlayer.propTypes = {
  title: PropTypes.string.isRequired,
  onExitButtonClickHandler: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  formatDurationToTime: PropTypes.func.isRequired,
  playbackToggleVideo: PropTypes.func.isRequired,
  setFullScreen: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default FullVideoPlayer;
