import React from "react";
import renderer from "react-test-renderer";
import FullVideoPlayer from "./full-video-player.jsx";

const Settings = {
  TITLE: `The Rock`,
  PROGRESS: 0,
  DURATION: 0,
  IS_PLAYING: false,
};

it(`Render FullVideoPlayer`, () => {
  const tree = renderer
    .create(
        <FullVideoPlayer
          title={Settings.TITLE}
          progress={Settings.PROGRESS}
          duration={Settings.DURATION}
          isPlaying={Settings.IS_PLAYING}
          formatDurationToTime={() => {}}
          playbackToggleVideo={() => {}}
          setFullScreen={() => {}}
          onExitButtonClickHandler={() => {}}>
          <video/>
        </FullVideoPlayer>).toJSON();

  expect(tree).toMatchSnapshot();
});
