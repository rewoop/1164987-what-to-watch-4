import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmPageOverview from "./film-page-overview";

const Settings = {
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

it(`Should FilmPageOverview render correctly`, () => {
  const tree = renderer
    .create(<FilmPageOverview
      ratingScore={Settings.ratingScore}
      ratingLevel={Settings.ratingLevel}
      ratingCount={Settings.ratingCount}
      filmDescription={Settings.filmDescription}
      filmDirector={Settings.filmDirector}
      filmStarring={Settings.filmStarring}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
