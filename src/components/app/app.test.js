import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Thriller`,
  RELEASE_DATE: 1996,
  RUN_TIME: `1h 39m`,
  BACKGROUND_POSTER: `img/bg-the-grand-budapest-hotel.jpg`,
  FILM_POSTER: `img/the-grand-budapest-hotel-poster.jpg`,
  RATING: {
    SCORE: `9.0`,
    LEVEL: `Very good`,
    COUNT: `1337 ratings`
  },
  FILM_DESCRIPTION: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.
  Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  FILM_DIRECTOR: `Wes Andreson`,
  FILM_STARRING: [
    `Bill Murray`,
    `Edward Norton`,
    `Jude Law`,
    `Willem Dafoe`,
    `Tom Cruz`
  ],
  REVIEWS: [
    {
      id: `0`,
      author: `Kate Muir`,
      text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      date: `December 24, 2016`,
      rating: `8,9`,
    }
  ],
  IS_MORE_FILMS: true
};

const films = [
  {
    title: `Fantastic Beasts`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Action`
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
            filmTitle={Settings.FILM_TITLE}
            filmGenre={Settings.FILM_GENRE}
            filmReleaseDate={Settings.RELEASE_DATE}
            films={films}
            backgroundFilmPoster={Settings.BACKGROUND_POSTER}
            filmPoster={Settings.FILM_POSTER}
            ratingScore={Settings.RATING.SCORE}
            ratingLevel={Settings.RATING.LEVEL}
            ratingCount={Settings.RATING.COUNT}
            filmDescription={Settings.FILM_DESCRIPTION}
            filmDirector={Settings.FILM_DIRECTOR}
            filmStarring={Settings.FILM_STARRING}
            runTime={Settings.RUN_TIME}
            reviews={Settings.REVIEWS}
            onShowButtonClickHandler={() => {}}
            isMoreFilms={Settings.IS_MORE_FILMS}
            activeGenreFilter={`All genres`}
            genresList={[`All genres`].concat(Array.from(new Set(films.map((film) => film.genre))))} onGenreClickHandler={() => {}}
            showedFilmsCount={8}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
