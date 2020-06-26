import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

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
};

const films = [
  {
    title: `Fantastic Beasts`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  }
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App
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
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
