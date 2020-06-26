import React from "react";
import renderer from "react-test-renderer";
import FilmPageOverview from "./film-page-overview";

const Settings = {
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
};

it(`Should FilmPageOverview render correctly`, () => {
  const tree = renderer
    .create(<FilmPageOverview
      ratingScore={Settings.RATING.SCORE}
      ratingLevel={Settings.RATING.LEVEL}
      ratingCount={Settings.RATING.COUNT}
      filmDescription={Settings.FILM_DESCRIPTION}
      filmDirector={Settings.FILM_DIRECTOR}
      filmStarring={Settings.FILM_STARRING}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
