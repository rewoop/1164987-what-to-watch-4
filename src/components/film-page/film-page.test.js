import React from "react";
import renderer from "react-test-renderer";
import FilmPage from "./film-page.jsx";

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Action`,
  RELEASE_DATE: 1996,
  BACKGROUND_POSTER: `img/bg-the-grand-budapest-hotel.jpg`,
  FILM_POSTER: `img/the-grand-budapest-hotel-poster.jpg`,
  RATING: {
    SCORE: `9.0`,
    LEVEL: `Bellissimo`,
    COUNT: `1337 ratings`
  },
  FILM_DESCRIPTION: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.
  Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  FILM_DIRECTOR: `Director: Wes Andreson`,
  FILM_STARRING: `Starring: Bill Murray, Edward Norton, Jude Law, Willem Dafoe and other`
};

it(`Should FilmPage render correctly`, () => {
  const tree = renderer
    .create(<FilmPage
      title={Settings.FILM_TITLE}
      genre={Settings.FILM_GENRE}
      releaseDate={Settings.RELEASE_DATE}
      backgroundFilmPoster={Settings.BACKGROUND_POSTER}
      filmPoster={Settings.FILM_POSTER}
      ratingScore={Settings.RATING.SCORE}
      ratingLevel={Settings.RATING.LEVEL}
      ratingCount={Settings.RATING.COUNT}
      filmDescription={Settings.FILM_DESCRIPTION}
      filmDirector={Settings.FILM_DIRECTOR}
      filmStarring={Settings.FILM_STARRING}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
