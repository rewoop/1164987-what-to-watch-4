import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Action`,
  RELEASE_DATE: 1996
};

const films = [
  {
    title: `Fantastic Beasts`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    title: `Bohemian Rhapsody`,
    image: `img/bohemian-rhapsody.jpg`,
    link: `movie-page.html`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    title: `Macbeth`,
    image: `img/macbeth.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    title: `Aviator`,
    image: `img/aviator.jpg`,
    link: `movie-page.html`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    title: `We need to talk about Kevin`,
    image: `img/we-need-to-talk-about-kevin.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    title: `What We Do in the Shadows`,
    image: `img/what-we-do-in-the-shadows.jpg`,
    link: `movie-page.html`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    title: `Revenant`,
    image: `img/revenant.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    title: `Johnny English`,
    image: `img/johnny-english.jpg`,
    link: `movie-page.html`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  }
];

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      title={Settings.FILM_TITLE}
      genre={Settings.FILM_GENRE}
      releaseDate={Settings.RELEASE_DATE}
      films={films}
      onTitleClickHandler={() => {}}
      onPosterClickHandler={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
