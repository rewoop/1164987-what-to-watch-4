import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const noop = () => {};

const films = [
  {
    filmTitle: `Fantastic Beasts`,
    filmImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    filmGenre: `Comedy`
  },
  {
    filmTitle: `Bohemian Rhapsody`,
    filmImage: `img/bohemian-rhapsody.jpg`,
    filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    filmGenre: `Crime`
  },
  {
    filmTitle: `Macbeth`,
    filmImage: `img/macbeth.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    filmGenre: `Documentary`
  },
  {
    filmTitle: `Aviator`,
    filmImage: `img/aviator.jpg`,
    filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    filmGenre: `Drama`
  },
  {
    filmTitle: `We need to talk about Kevin`,
    filmImage: `img/we-need-to-talk-about-kevin.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    filmGenre: `Thriller`
  },
  {
    filmTitle: `What We Do in the Shadows`,
    filmImage: `img/what-we-do-in-the-shadows.jpg`,
    filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    filmGenre: `Horror`
  },
  {
    filmTitle: `Revenant`,
    filmImage: `img/revenant.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    filmGenre: `Thriller`
  },
  {
    filmTitle: `Johnny English`,
    filmImage: `img/johnny-english.jpg`,
    filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    filmGenre: `Romance`
  }
];

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Action`,
  RELEASE_DATE: 1996,
  ACTIVE_GENRE_FILTER: `Action`,
  GENRES_LIST: [`All genres`].concat(Array.from(new Set(films.map((film) => film.filmGenre)))),
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
      onTitleClickHandler={noop}
      onPosterClickHandler={noop}
      onGenreClickHandler={noop}
      onShowButtonClickHandler={noop}
      isMoreFilms={Settings.IS_MORE_FILMS}
      activeGenreFilter={Settings.ACTIVE_GENRE_FILTER}
      showedFilmsCount={8}
      src={Settings.FILM_SRC}
      onPlayButtonClickHandler={noop}
      isSignIn={`NO_AUTH`}
      onSignInClickHandler={noop}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
