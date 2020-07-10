import React from "react";
import renderer from "react-test-renderer";
import FilmsList from "./films-list.jsx";

const filmsInfo = [
  {
    FILM_TITLE: `Fantastic Beasts`,
    FILM_IMAGE: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    FILM_VIDEO: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    FILM_TITLE: `Bohemian Rhapsody`,
    FILM_IMAGE: `img/bohemian-rhapsody.jpg`,
    FILM_VIDEO: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    FILM_TITLE: `Macbeth`,
    FILM_IMAGE: `img/macbeth.jpg`,
    FILM_VIDEO: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    FILM_TITLE: `Aviator`,
    FILM_IMAGE: `img/aviator.jpg`,
    FILM_VIDEO: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    FILM_TITLE: `We need to talk about Kevin`,
    FILM_IMAGE: `img/we-need-to-talk-about-kevin.jpg`,
    FILM_VIDEO: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    FILM_TITLE: `What We Do in the Shadows`,
    FILM_IMAGE: `img/what-we-do-in-the-shadows.jpg`,
    FILM_VIDEO: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    FILM_TITLE: `Revenant`,
    FILM_IMAGE: `img/revenant.jpg`,
    FILM_VIDEO: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    FILM_TITLE: `Johnny English`,
    FILM_IMAGE: `img/johnny-english.jpg`,
    FILM_VIDEO: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  }
];

it(`Should FilmsList render correctly`, () => {
  const tree = renderer
    .create(<FilmsList
      films={filmsInfo}
      onTitleClickHandler={() => {}}
      onPosterClickHandler={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
