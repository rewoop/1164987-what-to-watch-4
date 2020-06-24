import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

const mock = {
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Should video player work right`, () => {
  it(`Should video be played`, () => {

    const videoPlayer = mount(
        <VideoPlayer
          isPlaying={true}
          src={mock.src}
          poster={mock.image}
          muted
        />
    );

    const spy = jest.spyOn(window.HTMLMediaElement.prototype, `play`)
      .mockImplementation(() => {});

    expect(spy).toHaveBeenCalled();

    expect(videoPlayer.state().isPlaying).toBe(true);
  });
});
