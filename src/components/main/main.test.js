import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const films = [
  {
    FILM_TITLE: `Fantastic Beasts`,
    FILM_IMAGE: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    FILM_VIDEO: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    FILM_GENRE: `Comedy`
  },
  {
    FILM_TITLE: `Bohemian Rhapsody`,
    FILM_IMAGE: `img/bohemian-rhapsody.jpg`,
    FILM_VIDEO: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    FILM_GENRE: `Crime`
  },
  {
    FILM_TITLE: `Macbeth`,
    FILM_IMAGE: `img/macbeth.jpg`,
    FILM_VIDEO: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    FILM_GENRE: `Documentary`
  },
  {
    FILM_TITLE: `Aviator`,
    FILM_IMAGE: `img/aviator.jpg`,
    FILM_VIDEO: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    FILM_GENRE: `Drama`
  },
  {
    FILM_TITLE: `We need to talk about Kevin`,
    FILM_IMAGE: `img/we-need-to-talk-about-kevin.jpg`,
    FILM_VIDEO: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    FILM_GENRE: `Thriller`
  },
  {
    FILM_TITLE: `What We Do in the Shadows`,
    FILM_IMAGE: `img/what-we-do-in-the-shadows.jpg`,
    FILM_VIDEO: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    FILM_GENRE: `Horror`
  },
  {
    FILM_TITLE: `Revenant`,
    FILM_IMAGE: `img/revenant.jpg`,
    FILM_VIDEO: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    FILM_GENRE: `Thriller`
  },
  {
    FILM_TITLE: `Johnny English`,
    FILM_IMAGE: `img/johnny-english.jpg`,
    FILM_VIDEO: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    FILM_GENRE: `Romance`
  }
];

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Action`,
  RELEASE_DATE: 1996,
  ACTIVE_GENRE_FILTER: `Action`,
  GENRES_LIST: [`All genres`].concat(Array.from(new Set(films.map((film) => film.FILM_GENRE)))),
  IS_MORE_FILMS: true,
  FILM_SRC: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
};

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      title={Settings.FILM_TITLE}
      genre={Settings.FILM_GENRE}
      genres={Settings.GENRES_LIST}
      releaseDate={Settings.RELEASE_DATE}
      films={films}
      onTitleClickHandler={() => {}}
      onPosterClickHandler={() => {}}
      onGenreClickHandler={() => {}}
      onShowButtonClickHandler={() => {}}
      isMoreFilms={Settings.IS_MORE_FILMS}
      activeGenreFilter={Settings.ACTIVE_GENRE_FILTER}
      showedFilmsCount={8}
      src={Settings.FILM_SRC}
      onPlayButtonClickHandler={() => {}}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
