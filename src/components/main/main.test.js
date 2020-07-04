import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const films = [
  {
    title: `Fantastic Beasts`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Comedy`
  },
  {
    title: `Bohemian Rhapsody`,
    image: `img/bohemian-rhapsody.jpg`,
    link: `movie-page.html`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Crime`
  },
  {
    title: `Macbeth`,
    image: `img/macbeth.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Documentary`
  },
  {
    title: `Aviator`,
    image: `img/aviator.jpg`,
    link: `movie-page.html`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Drama`
  },
  {
    title: `We need to talk about Kevin`,
    image: `img/we-need-to-talk-about-kevin.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Thriller`
  },
  {
    title: `What We Do in the Shadows`,
    image: `img/what-we-do-in-the-shadows.jpg`,
    link: `movie-page.html`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Horror`
  },
  {
    title: `Revenant`,
    image: `img/revenant.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Thriller`
  },
  {
    title: `Johnny English`,
    image: `img/johnny-english.jpg`,
    link: `movie-page.html`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Romance`
  }
];

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Action`,
  RELEASE_DATE: 1996,
  ACTIVE_GENRE_FILTER: `Action`,
  GENRES_LIST: [`All genres`].concat(Array.from(new Set(films.map((film) => film.genre)))),
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
