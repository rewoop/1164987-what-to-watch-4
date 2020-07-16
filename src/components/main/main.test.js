import React from "react";
import renderer from "react-test-renderer";
import Main from "./main";

const noop = () => {};

const getGenresList = (films) => {
  return [`All genres`].concat(Array.from(new Set(films.map((film) => film.filmGenre))));
};

const films = [
  {
    filmTitle: `Fantastic Beasts`,
    filmImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    filmGenre: `Comedy`
  }
];

const Settings = {
  filmTitle: `The Rock`,
  filmGenre: `Thriller`,
  filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  releaseDate: 1996,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
};

it(`Should Main render correctly`, () => {
  const tree = renderer
    .create(<Main
      promoFilm={Settings}
      films={films}
      onTitleClickHandler={noop}
      onPosterClickHandler={noop}
      onGenreClickHandler={noop}
      onShowButtonClickHandler={noop}
      isMoreFilms={true}
      activeGenreFilter={`All genres`}
      showedFilmsCount={8}
      onPlayButtonClickHandler={noop}
      isSignIn={`NO_AUTH`}
      onSignInClickHandler={noop}
      genres={getGenresList(films)}
      errorDataStatus={false}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
