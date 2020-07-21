import React from "react";
import renderer from "react-test-renderer";
import FilmsList from "./films-list.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const filmsInfo = [
  {
    filmTitle: `Fantastic Beasts`,
    filmImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    filmTitle: `Bohemian Rhapsody`,
    filmImage: `img/bohemian-rhapsody.jpg`,
    filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    filmTitle: `Macbeth`,
    filmImage: `img/macbeth.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    filmTitle: `Aviator`,
    filmImage: `img/aviator.jpg`,
    filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    filmTitle: `We need to talk about Kevin`,
    filmImage: `img/we-need-to-talk-about-kevin.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    filmTitle: `What We Do in the Shadows`,
    filmImage: `img/what-we-do-in-the-shadows.jpg`,
    filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    filmTitle: `Revenant`,
    filmImage: `img/revenant.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    filmTitle: `Johnny English`,
    filmImage: `img/johnny-english.jpg`,
    filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  }
];

it(`Should FilmsList render correctly`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <FilmsList
            films={filmsInfo}
            onTitleClickHandler={() => {}}
            onPosterClickHandler={() => {}}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
