import React from "react";
import renderer from "react-test-renderer";
import FullVideoPlayer from "./full-video-player.jsx";

const Settings = {
  PAGE_ID: 1,
  PROGRESS: 0,
  DURATION: 0,
  IS_PLAYING: false,
};

it(`Render FullVideoPlayer`, () => {
  const tree = renderer
    .create(
        <FullVideoPlayer
          pageId={Settings.PAGE_ID}
          progress={Settings.PROGRESS}
          duration={Settings.DURATION}
          isPlaying={Settings.IS_PLAYING}
          formatDurationToTime={() => {}}
          pauseVideo={() => {}}
          setFullScreen={() => {}}
          onExitButtonClickHandler={() => {}}>
          <video/>
        </FullVideoPlayer>).toJSON();

  expect(tree).toMatchSnapshot();
});
