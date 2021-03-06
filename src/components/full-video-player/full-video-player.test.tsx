import * as React from "react";
import * as renderer from "react-test-renderer";
import FullVideoPlayer from "./full-video-player";
import {noop} from "../../utils";

jest.mock(`react-router-dom`);

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
          formatDurationToTime={noop}
          playbackToggleVideo={noop}
          setFullScreen={noop}
        >
          <video/>
        </FullVideoPlayer>).toJSON();

  expect(tree).toMatchSnapshot();
});
