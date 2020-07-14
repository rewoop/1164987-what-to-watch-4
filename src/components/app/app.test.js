import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const noop = () => {};

const Settings = {
  id: 1,
  filmTitle: `The Rock`,
  filmGenre: `Thriller`,
  filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  releaseDate: 1996,
  filmRunTime: 356,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  ratingScore: 9,
  ratingLevel: 9,
  ratingCount: `1337 ratings`,
  filmDescription: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.
  Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  filmDirector: `Wes Andreson`,
  filmStarring: [
    `Bill Murray`,
    `Edward Norton`,
    `Jude Law`,
    `Willem Dafoe`,
    `Tom Cruz`
  ],
};

const films = [
  {
    filmTitle: `Fantastic Beasts`,
    filmImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    filmGenre: `Comedy`
  }
];

const comments = [
  {
    id: 0,
    user: {
      id: 1,
      name: `Kate Muir`,
    },
    comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    date: `December 24, 2016`,
    rating: 9,
  }
];

it(`Render App`, () => {
  const store = mockStore({
    genre: `All genres`
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            promoFilm={Settings}
            films={films}
            onShowButtonClickHandler={noop}
            isMoreFilms={true}
            activeGenreFilter={`All genres`}
            genresList={[`All genres`].concat(Array.from(new Set(films.map((film) => film.filmGenre))))}
            onGenreClickHandler={noop}
            showedFilmsCount={8}
            filmsByGenre={Settings.FILM_GENRE === `All genres` ? films : films.filter((currentFilm) => currentFilm.filmGenre === Settings.FILM_GENRE)}
            authorizationStatus={`NO_AUTH`}
            login={noop}
            errorAuthorizationStatus={false}
            filmComments={comments}
            getCommentByFilmId={noop}
            loadingDataStatus={false}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
