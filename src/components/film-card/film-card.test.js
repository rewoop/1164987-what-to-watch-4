import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";

const filmInfo = {
  title: `Fantastic Beasts`,
  image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  link: `movie-page.html`,
  src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Should FilmCard render correctly`, () => {
  const tree = renderer
    .create(<FilmCard
      film={filmInfo}
      onTitleClickHandler={() => {}}
      onPosterClickHandler={() => {}}
      isPlaying={false}
      setPlayingFilm={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
