import React from "react";
import renderer from "react-test-renderer";
import FilmCard from "./film-card.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const filmInfo = {
  id: 666,
  filmTitle: `Fantastic Beasts`,
  filmImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Should FilmCard render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <FilmCard
            film={filmInfo}
            onTitleClickHandler={() => {}}
            onPosterClickHandler={() => {}}
            isPlaying={false}
            setPlayingFilm={() => {}}
          />
        </Router>
        , {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
